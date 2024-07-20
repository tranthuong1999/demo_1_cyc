import { makeAutoObservable } from 'mobx';

class ReviewStore {
    listReviewInfo = [];
    constructor() {
        makeAutoObservable(this);
    }
    fetchListReviewInfor = async (reviewCode: string, article: string) => {
        try {
            const response = await fetch(`https://${reviewCode}.mockapi.io/${article}`);
            const data: any = await response.json();
            this.listReviewInfo = data;
        }
        catch (error) {
            console.error('Failed to fetch todos', error);
        }
    }

}

const reviewStore = new ReviewStore();
export default reviewStore;