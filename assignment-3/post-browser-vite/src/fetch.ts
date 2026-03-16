const link = 'https://jsonplaceholder.typicode.com/posts/';

type Post = {
  id: number
  title: string
  body: string
}

type Comment = {
  id: string
  name: string
  email: string
  body: string
}

export class ModelManager {
  private cache: Map<number, Post> = new Map();
  private TTL = 5 * 60 * 1000; // milliseconds
  private lastFetched: number | null = null;

  async fetchPost(id: number):Promise<Post> {
    const cached = this.cache.get(id);
    if (cached && this.isCacheValid()) {
      return cached; // return cached
    }
    const post = await this.fetchFromAPI(id);
    this.cache.set(id, post);
    this.lastFetched = Date.now();
    return post!;
  }

  async fetchComments(id: string): Promise<Comment[]> {
    return await this.fetchFromCommentAPI(id);
  }

  private isCacheValid(): boolean {
    return this.lastFetched !== null && Date.now() - this.lastFetched < this.TTL;
  }

  private async fetchFromAPI(id: number): Promise<Post> {
    const response = await fetch(link+"/"+String(id));
    return await response.json();
  }

  private async fetchFromCommentAPI(id: string): Promise<Comment[]> {
    const response = await fetch(link + id + "/comments");
    return await response.json();
  }

  clearCache():void {
    this.cache.clear();
    this.lastFetched = Date.now();
  }
}