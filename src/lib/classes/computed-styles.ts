export class ComputedStyles {
  public getInnerHeight(el: HTMLElement): number {
    return el.offsetHeight -
      parseInt(getComputedStyle(el, null).getPropertyValue('padding-top'), 0) -
      parseInt(getComputedStyle(el, null).getPropertyValue('padding-bottom'), 0);
  }

  public getOuterHeight(el: HTMLElement): number {
    // console.log(el, el.offsetHeight);

    return el.getClientRects()[0].height +
      parseInt(getComputedStyle(el, null).getPropertyValue('margin-top'), 0) +
      parseInt(getComputedStyle(el, null).getPropertyValue('margin-bottom'), 0) +
        parseInt(getComputedStyle(el, null).getPropertyValue('border-spacing'), 0);
  }
}
