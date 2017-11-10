configClasses.repository.ts File in the ClientApp/ app / models Folder
export class Filter {
  category?: string;
  search?: string;
  related: boolean = false;

  reset() {
    this.category = this.search = null;
    this.related = false;
  }
}
