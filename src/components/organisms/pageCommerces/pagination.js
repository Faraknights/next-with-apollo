import Link from 'next/link'

export default function Pagination (options){
    let {currentPage, nbPage, uri} = options
    currentPage = parseInt(currentPage)
    nbPage = parseInt(nbPage)

    //On fait un tableau des pages accessibles
    let pagePagination = [...new Set([1, currentPage - 1, currentPage, currentPage + 1 , nbPage].filter(e => e > 0 && e < nbPage + 1))]
    let lastElem = 0;     

    //On met des "..." lorsque il y a des trous dans la pagination
    for (let index = 0; index < pagePagination.length; index++) {
      if(pagePagination[index] - lastElem != 1){
        pagePagination = [...pagePagination.slice(0, index), "...", ...pagePagination.slice(index)] ;
        index++;
        console.log(pagePagination)
      }
      lastElem = pagePagination[index]
    }
       
    //On met sous forme d'objet en indiquant si il est cliquable et où il redirige
    pagePagination = [
      {label: '←', clickable: true, uri: uri + (currentPage - 1)},
      ...pagePagination.map(e => ({
        label: e, 
        clickable: (e == '...' ? false : true),
        uri: (e == '...' ? '' : uri + e)
      })),
      {label: '→', clickable: true, uri: uri + (currentPage + 1)}
    ]

    //On retire les fleches si on est si la premiere ou derniere page
    pagePagination = pagePagination.filter((e,i) => (
        !((i == 0 && currentPage == 1) || (i == nbPage + 1 && currentPage == nbPage))
    ))

    console.log(pagePagination)

    return (
        <div className="bg-white rounded-md shadow-[2px_2px_6px_-1px_#DDD] mb-6 p-3 flex">
            {pagePagination.map((e) => (
            <Link href={e.uri}>
                <div className={e.clickable ? "cursor-pointer rounded-md mx-1 " + (e.label == currentPage ? "bg-[#ff8c60]" : "hover:bg-gray-100") : "cursor-default pointer-events-none"}>
                    <div className={"h-7 w-7 font-semibold p-2 mx-[1px] flex items-center justify-center " + (e.label == currentPage ? "text-white" : "text-gray-400") } >
                        {e.label}
                    </div>
                </div>
            </Link>
            ))}
        </div>
    )
}