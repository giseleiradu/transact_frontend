
export interface user {
  id?: string;
  username?: string;
  email: string;
  password: string;
  USD? : string;
  EUR? :string;
  NGN? : string;

}

export type users = {
  users: user[];
}

export interface transaction{
    senderEmail :string;
    receiverEmail : string;
    sendingAmount :string;
    convertedAmount :string;
    sendingCurrency :string;
    receivingCurrency: string;
}

export type transactions = {
    transactions: transaction[];
}