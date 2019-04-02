export class Profile {
  constructor (
    public avatar: any,
    public username: string,
    public name: string,
    public bio:string,
    public repos: number,
    public followers: number,
    public following: number,
    public html_url: string
    ){}
}
