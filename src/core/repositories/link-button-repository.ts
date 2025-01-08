export interface LinkButtonRepository {
  deleteLinkButtons: (ids: string[]) => Promise<any>;
}
