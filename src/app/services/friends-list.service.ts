import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FriendsListService {
  constructor() {}

  friendsList = [
    {
      id: 1,
      username: 'John',
      email: 'john@example.com',
      image_url: 'https://picsum.photos/3840/2160?random=1',
    },
    {
      id: 2,
      username: 'Mary',
      email: 'mary@example.com',
      image_url: 'https://picsum.photos/3840/2160?random=2',
    },
    {
      id: 3,
      username: 'Peter',
      email: 'peter@example.com',
      image_url: 'https://picsum.photos/3840/2160?random=3',
    },
    {
      id: 4,
      username: 'Susan',
      email: 'susan@example.com',
      image_url: 'https://picsum.photos/3840/2160?random=4',
    },
  ];
}