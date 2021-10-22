from backend.blockchain.block import Block
from backend.tests.blockchain.test_block import last_block


class Blockchain:
    """
    Blockchain: a public ledger of transactions.
    Implemented as a list of blocks.
    """

    def __init__(self) -> None:
        self.chain = [Block.genesis()]

    def add_block(self, data):
        self.chain.append(Block.mine_block(self.chain[-1], data))

    def __repr__(self) -> str:
        return f'Blockchain: {self.chain}'

    def replace_chain(self, chain):
        """
        Replace local chain with incoming one if the follow applies:
        - Incoming chain is longer than the local one.
        - Incoming chain is formatted correctly
        """
        if len(chain) <= len(self.chain):
            raise Exception('Cannot replace chain, must be longer!')

        try:
            Blockchain.is_valid_chain(chain)
        except Exception as e:
            raise Exception(
                f'Cannot replace, the incoming chain is invalid!: {e}')

        self.chain = chain

    @staticmethod
    def is_valid_chain(chain):
        """
        Validate the incoming chain of blocks.
        By checking:
        - chain must start with the genesis block
        - blocks must be formatted correctly
        """
        if chain[0] != Block.genesis():
            raise Exception('Genesis block is invalid!')

        # Skipping the genesis block
        for i in range(1, len(chain)):
            block = chain[i]
            last_block = chain[i-1]
            Block.is_valid_block(last_block, block)


def main():
    blockchain = Blockchain()
    blockchain.add_block('one')
    blockchain.add_block('two')
    print(blockchain)


if __name__ == '__main__':
    main()
