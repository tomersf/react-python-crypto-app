import uuid
import json

from backend.config import STARTING_BALANCE
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.asymmetric.utils import encode_dss_signature, decode_dss_signature
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.exceptions import InvalidSignature


class Wallet:
    """
    Represent a wallet for a single miner.
    keep track of the miner balance.
    allow a miner to authorize transactions.
    """

    def __init__(self, blockchain=None) -> None:
        self.address = str(uuid.uuid4())[0:8]
        self.private_key = ec.generate_private_key(
            ec.SECP256K1(),
            default_backend())
        self.public_key = self.private_key.public_key()
        self.serialize_public_key()
        self.blockchain = blockchain

    @property
    def balance(self):
        return Wallet.calculate_balance(self.blockchain, self.address)

    def sign(self, data):
        """
        Generate a signature based on the data using the local private key.
        """
        return decode_dss_signature(self.private_key.sign(json.dumps(data).encode('utf-8'), ec.ECDSA(hashes.SHA256())))

    def serialize_public_key(self):
        """
        Serialize the public key.
        """
        self.public_key = self.public_key.public_bytes(serialization.Encoding.PEM,
                                                       serialization.PublicFormat.SubjectPublicKeyInfo).decode('utf-8')

    @staticmethod
    def verify(public_key, data, signature):
        """
        Verify a signature based upon the public_key and data provided.
        """
        deserialize_public_key = serialization.load_pem_public_key(
            public_key.encode('utf-8'),
            default_backend()
        )

        (r, s) = signature

        try:
            deserialize_public_key.verify(encode_dss_signature(r, s),
                                          json.dumps(data).encode('utf-8'), ec.ECDSA(hashes.SHA256()))
            return True
        except InvalidSignature:
            return False

    @staticmethod
    def calculate_balance(blockchain, address):
        """
        Calculate the balance of a given address of an wallet by evaluating the data in the blockchain.
        """
        balance = STARTING_BALANCE

        if not blockchain:
            return balance

        for block in blockchain.chain:
            for transaction in block.data:
                if transaction['input']['address'] == address:
                    balance = transaction['output'][address]
                elif address in transaction['output']:
                    balance += transaction['output'][address]

        return balance


def main():
    wallet = Wallet()
    print(f'wallet.._dict__ : {wallet.__dict__}')
    data = {'foo': 'bar'}
    signature = wallet.sign(data)
    print(f'signature: {signature}')


if __name__ == '__main__':
    main()
