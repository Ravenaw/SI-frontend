import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.sessionStorage.setItem('token', user.token);
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user));
  }
  saveToken(token: string): void {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.setItem('token', token);
    localStorage.setItem('token', token);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
  public getToken(): any {
    return window.sessionStorage.getItem('token');
  }
  public logout(): void {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem('friendsList');
    window.sessionStorage.removeItem('userSocket');
  }
  public saveUserSocket(user : any): void {
    window.sessionStorage.setItem('userSocket', JSON.stringify(user));
  }
  public getUserSocket(): any {
    const user = window.sessionStorage.getItem('userSocket');
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  public saveFriendsList(friendsList: any): void {
    window.sessionStorage.removeItem('friendsList');
    window.sessionStorage.setItem('friendsList', JSON.stringify(friendsList));
  }
  public getFriendsList(): any {
    const friendsList = window.sessionStorage.getItem('friendsList');
    if (friendsList) {
      return JSON.parse(friendsList);
    }
    return {};
  }
  public setFriendOnline(friend: any): void {
    let friendsList = JSON.parse(window.sessionStorage.getItem('friendsList')!);
    friendsList.forEach((element: any) => {
      if (element.email == friend.email) {
        element.online = true;
      }
    });
    window.sessionStorage.setItem('friendsList', JSON.stringify(friendsList));
  }
  public setFriendOffline(friend: any): void {
    let friendsList = JSON.parse(window.sessionStorage.getItem('friendsList')!);
    friendsList.forEach((element: any) => {
      if (element.email == friend.email) {
        element.online = false;
      }
    });
    window.sessionStorage.setItem('friendsList', JSON.stringify(friendsList));
  }
}