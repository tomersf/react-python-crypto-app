import time
from backend.wallet.transaction import Transaction

from pubnub.pubnub import PubNub
from pubnub.pnconfiguration import PNConfiguration
from pubnub.callbacks import SubscribeCallback

from backend.blockchain.block import Block
from env import subscribe_key, publish_key

pnconfig = PNConfiguration()
pnconfig.subscribe_key = subscribe_key
pnconfig.publish_key = publish_key

CHANNELS = {
    'TEST': 'TEST',
    'BLOCK': 'BLOCK',
    'TRANSACTION': 'TRANSACTION'
}


class Listener(SubscribeCallback):
    def __init__(self, blockchain, transaction_pool) -> None:
        # super().__init__()
        self.blockchain = blockchain
        self.transaction_pool = transaction_pool

    def message(self, pubnub, message_object):
        print(
            f'\n-- Channel: {message_object.channel} | Message: {message_object.message}')

        if message_object.channel == CHANNELS['BLOCK']:
            block = Block.from_json(message_object.message)
            potential_chain = self.blockchain.chain[:]
            potential_chain.append(block)

            try:
                self.blockchain.replace_chain(potential_chain)
                print(f'\n-- Succesfully replace the local chain')
            except Exception as e:
                print(f'\n-- Did not replace the chain: {e}')

        elif message_object.channel == CHANNELS['TRANSACTION']:
            transaction = Transaction.from_json(message_object.message)
            self.transaction_pool.set_transaction(transaction)
            print('\n -- Set the new transaction in the transaction pool')


class PubSub():
    """
    Handles publish / subscrible layer of the app
    provides communication between the nodes of the blockchain network
    """

    def __init__(self, blockchain, transaction_pool) -> None:
        self.pubnub = PubNub(pnconfig)
        self.pubnub.subscribe().channels(list(CHANNELS.values())).execute()
        self.pubnub.add_listener(Listener(blockchain, transaction_pool))

    def publish(self, channel, msg):
        """
        Publish the msg to the channel.
        """
        self.pubnub.publish().channel(channel).message(msg).sync()

    def broadcast_block(self, block):
        """
        Broadcast a block obj to all nodes
        """
        self.publish(CHANNELS['BLOCK'], block.to_json())

    def broadcast_transaction(self, transaction):
        """
        Broadcast a transaction to all nodes.
        """
        self.publish(CHANNELS['TRANSACTION'], transaction.to_json())


def main():
    pubsub = PubSub()
    time.sleep(1)
    pubsub.publish(CHANNELS['TEST'], {'foo': 'bar'})


if __name__ == '__main__':
    main()
