export class ChatData {
    userID: string = "";
    titleName: string = "";
    titleUId: string = "";
    dateRange: string = "";
    chat: ChatEntry[] = [];
}
export class ChatEntry {
    question: string = "";
    answer: string = "";
}