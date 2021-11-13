from backend.config import STARTING_BALANCE
from backend.wallet.wallet import Wallet
from backend.wallet.transaction import Transaction
from backend.blockchain.blockchain import Blockchain


def test_verify_valid_signature():
    data = {'foo': 'test_data'}
    wallet = Wallet()
    signature = wallet.sign(data)

    assert Wallet.verify(wallet.public_key, data, signature)


def test_verify_invalid_signature():
    data = {'foo': 'test_data'}
    wallet = Wallet()
    signature = wallet.sign(data)

    assert not Wallet.verify(Wallet().public_key, data, signature)


def test_calculate_balance():
    blockchain = Blockchain()
    wallet = Wallet()

    assert Wallet.calculate_balance(
        blockchain, wallet.address) == STARTING_BALANCE

    amount = 70
    transaction = Transaction(wallet, 'recipient', amount)
    blockchain.add_block([transaction.to_json()])

    assert Wallet.calculate_balance(
        blockchain, wallet.address) == STARTING_BALANCE - amount

    received_amount_one = 20
    received_transaction_one = Transaction(
        Wallet(), wallet.address, received_amount_one)
    received_amount_two = 40
    received_transaction_two = Transaction(
        Wallet(), wallet.address, received_amount_two)

    blockchain.add_block(
        [received_transaction_one.to_json(), received_transaction_two.to_json()])

    assert Wallet.calculate_balance(
        blockchain, wallet.address) == STARTING_BALANCE - amount + received_amount_one + received_amount_two
