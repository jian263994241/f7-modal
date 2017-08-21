
export default class noScroll {

  constructor (target){

    this.target = document.querySelector(target || '.page-content') || document.querySelector('html');
  }

  on = ()=>{
      this.target.style.overflow = 'hidden';
  };

  off = ()=>{
      this.target.style.overflow = 'auto';
  };

  toggle = ()=>{
      let domPageContent = this.target,
          styleOverflowValue = domPageContent.style.overflow;

      domPageContent.style.overflow = styleOverflowValue === 'hidden' ? 'auto' : 'hidden';
  };

}
