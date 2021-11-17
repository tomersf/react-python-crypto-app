import os
import random
import requests

from flask import Flask, jsonify, request,Response
from flask_cors import CORS

from backend.blockchain.blockchain import Blockchain
from backend.wallet.transaction import Transaction
from backend.wallet.wallet import Wallet
from backend.wallet.transaction_pool import TransactionPool
from backend.pubsub import PubSub

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': 'http://localhost:3000'}})
blockchain = Blockchain()
transaction_pool = TransactionPool()
pubsub = PubSub(blockchain, transaction_pool)
wallets_dict = dict()


def is_user_in_dict(name):
    if name in wallets_dict:
        return True
    return False

@app.route('/login', methods=['POST'])
def route_login():
    login_data = request.get_json()
    username = login_data['name']
    if not username in wallets_dict:
        wallets_dict.update({username: Wallet()})
        return Response(status=201)

    return Response(status=200)


@app.route('/blockchain')
def route_blockchain():
    return jsonify(blockchain.to_json())

@app.route('/blockchain/range')
def route_blockchain_range():
    # example : http://localhost:5000/blockchain/range?start=3&end=6 
    start = int(request.args.get('start'))
    end = int(request.args.get('end'))

    return jsonify(blockchain.to_json()[::-1][start:end])


@app.route('/blockchain/length')
def route_blockchain_length():
    return jsonify(len(blockchain.chain))

@app.route('/blockchain/mine')
def route_blockchain_mine():
    username = request.args.get('user')
    if is_user_in_dict(username):
        wallet = wallets_dict[username]
        transaction_data = transaction_pool.transaction_data()
        transaction_data.append(Transaction.reward_transaction(wallet).to_json())
        blockchain.add_block(transaction_data)
        block = blockchain.chain[-1]
        pubsub.broadcast_block(block)
        transaction_pool.clear_blockchain_transactions(blockchain)

        return jsonify(block.to_json())
    
    return "User not found", 401

@app.route('/users')
def route_users():
    return jsonify(list(set(wallets_dict.keys())))


@app.route('/wallet/transact', methods=['POST'])
def route_wallet_transact():
    transaction_data = request.get_json()
    username = transaction_data['name']
    if is_user_in_dict(username):
        wallet = wallets_dict[username]
        transaction = transaction_pool.existing_transaction(wallet.address)

        if transaction:
            transaction.update(
                wallet,
                transaction_data['recipient'],
                transaction_data['amount']
            )
        else:
            transaction = Transaction(
                wallet,
                transaction_data['recipient'],
                transaction_data['amount']
            )

        pubsub.broadcast_transaction(transaction)

        return jsonify(transaction.to_json())
    
    return "Could not make transaction, user is not registered!",  401


@app.route('/wallet/info')
def route_wallet_info():
    username = request.args.get('user')
    if is_user_in_dict(username):
        wallet = wallets_dict[username]
        return jsonify({
            'address': wallet.address,
            'balance': wallet.balance,
            'name': wallet.name
        })
    
    return "No user wallet found", 400


ROOT_PORT = 5000
PORT = ROOT_PORT

if os.environ.get('PEER') == 'True':
    PORT = random.randit(5001, 6000)
    result = requests.get(f'http://localhost:{ROOT_PORT}/blockchain')
    result_blockchain = Blockchain.from_json(result.json())

    try:
        blockchain.replace_chain(result_blockchain.chain)
        print('\n-- Successfully synced the local chain')
    except Exception as e:
        print(f'\n-- Error in sync blockchain chain: {e}')


app.run(port=PORT)
