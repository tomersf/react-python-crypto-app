class TransactionPool:
    def __init__(self) -> None:
        self.transaction_map = {}

    def set_transaction(self, transaction):
        """
        Set a transaction in the transaction pool.
        """
        self.transaction_map[transaction.id] = transaction

    def existing_transaction(self, address):
        """
        Find a transaction by the address in the pool
        """
        for transaction in self.transaction_map.values():
            if transaction.input['address'] == address:
                return transaction

    def transaction_data(self):
        """
        Return the transactions in the pool represented in their json serialized form
        """
        transactions_values_in_pool = self.transaction_map.values()
        transaction_data = list(
            map(lambda transaction: transaction.to_json(), transactions_values_in_pool))
        return transaction_data

    def clear_blockchain_transactions(self, blockchain):
        """
        Delete blockchain recorded transactions from the transaction pool
        """
        for block in blockchain.chain:
            for transaction in block.data:
                try:
                    del self.transaction_map[transaction['id']]
                except KeyError:
                    pass
