declare var M: any

export class MaterialServices {
  static toast(message: string) {
    M.toast({html: message});
  }
}
