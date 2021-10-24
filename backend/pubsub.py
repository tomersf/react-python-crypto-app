import time

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
    'BLOCK': 'BLOCK'
}


class Listener(SubscribeCallback):
    def __init__(self, blockchain) -> None:
        # super().__init__()
        self.blockchain = blockchain

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


class PubSub():
    """
    Handles publish / subscrible layer of the app
    provides communication between the nodes of the blockchain network
    """

    def __init__(self, blockchain) -> None:
        self.pubnub = PubNub(pnconfig)
        self.pubnub.subscribe().channels(list(CHANNELS.values())).execute()
        self.pubnub.add_listener(Listener(blockchain))

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


def main():
    pubsub = PubSub()
    time.sleep(1)
    pubsub.publish(CHANNELS['TEST'], {'foo': 'bar'})


if __name__ == '__main__':
    main()
