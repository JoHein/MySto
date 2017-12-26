export class LoginModel {

  constructor(
    public emailuser: string,
    public password?: string,
    public username?: string,
    public loginConfirm?: string,
    public toPage?: string,
  ) {  }

}
