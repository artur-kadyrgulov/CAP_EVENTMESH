using { zkad as my } from '../db/schema';
service ReceiverService  {

  entity Suppliers as projection on my.Suppliers;

}