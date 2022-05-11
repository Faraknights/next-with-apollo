export default (currentPage, nbPage) => {
    currentPage = parseInt(currentPage)
    nbPage = parseInt(nbPage)
    let pagePagination = [...new Set([1, currentPage - 1, currentPage, currentPage + 1 , nbPage].filter(e => e > 0 && e < nbPage + 1))]
    let lastElem = 0;                                 
    for (let index = 0; index < pagePagination.length; index++) {
      if(pagePagination[index] - lastElem != 1){
        pagePagination = [...pagePagination.slice(0, index), "...", ...pagePagination.slice(index)] ;
        index++;
      }
      lastElem = pagePagination[index]
    }
    pagePagination = [
      {label: '←', clickable: true},
      ...pagePagination.map(e => ({
        label: e, 
        clickable: (e == '...' ? false : true)
        
      })),
      {label: '→', clickable: true}
    ]

    pagePagination = pagePagination.filter((e,i) => (
        !((i == 0 && currentPage == 1) || (i == nbPage + 1 && currentPage == nbPage))
    ))
    return pagePagination
}
  