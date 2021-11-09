import requests
import time

from backend.wallet.wallet import Wallet

BASE_URL = 'http://localhost:5000'


def get_blockchain():
    return requests.get(f'{BASE_URL}/blockchain').json()


def get_blockchain_mine():
    return requests.get(f'{BASE_URL}/blockchain/mine').json()


def post_wallet_transact(recipient, amount):
    return requests.post(f'{BASE_URL}/wallet/transact', json={
        'recipient': recipient,
        'amount': amount
    }).json()


start_blockchain = get_blockchain()
recipient = Wallet().address

post_wallet_transact_one = post_wallet_transact(recipient, 50)
post_wallet_transact_two = post_wallet_transact(recipient, 20)

time.sleep(1)
mined_block = get_blockchain_mine()
