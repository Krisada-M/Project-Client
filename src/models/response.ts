export interface Response<T = object> {
  Data: T;
  Status: status;
  Response: response;
}

export interface ErrorMsg {
  Message: Message;
}

export interface ErrorM {
  Message: string;
}

type response = {
  Datetime: string;
};

type status = {
  Code: number;
  Description: string;
  Message: string;
};

export interface Test<S = string> {
  message: S;
}
export interface Message {
  Severity: string;
  Code: string;
  Message: string;
  Detail: string;
  Hint: string;
  Position: number;
  InternalPosition: number;
  InternalQuery: string;
  Where: string;
  SchemaName: string;
  TableName: string;
  ColumnName: string;
  DataTypeName: string;
  ConstraintName: string;
  File: string;
  Line: number;
  Routine: string;
}