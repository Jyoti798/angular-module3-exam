export class User{
    constructor(
       readonly id:string,
       readonly  name:string,
       readonly  email:string,
       readonly  phone:string,
       readonly  address:string,
       readonly  pincode:string,
       readonly  type:string,
       readonly  token:string,
       readonly  refreshtoken:string,
    ){}
}