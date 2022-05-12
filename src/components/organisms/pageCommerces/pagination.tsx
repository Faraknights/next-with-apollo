import Link from 'next/link'

interface PaginationProps {
  currentPage: number;
  nbPage: number;
  uri: string;
}

export default function Pagination (options: PaginationProps){
    let {currentPage, nbPage, uri} = options

    //On fait un tableau des pages accessibles
    let pagePagination = [1, currentPage - 1, currentPage, currentPage + 1 , nbPage].filter(e => e > 0 && e < nbPage + 1)
    pagePagination = pagePagination.filter((e, i) => (pagePagination.indexOf(e) === i))
    let lastElem = 0;     

    let structPagination = pagePagination.map(e => ({
      label: e + "",
      clickable: true,
      uri: uri + e,
      value: e
    }))

    //On met des "..." lorsque il y a des trous dans la pagination
    for (let index = 0; index < structPagination.length; index++) {
      if(structPagination[index].value - lastElem != 1){
        structPagination = [
          ...structPagination.slice(0, index), 
          {
            label: "...",
            clickable: false,
            uri: '',
            value: NaN
          }, 
          ...structPagination.slice(index)
        ];
        index++;
      }
      lastElem = structPagination[index].value
    }
       
    //On met sous forme d'objet en indiquant si il est cliquable et où il redirige
    structPagination = [
      {
        label: '←', 
        clickable: true, 
        uri: uri + (currentPage - 1),
        value: currentPage - 1
      },
      ...structPagination,
      {
        label: '→', 
        clickable: true, 
        uri: uri + (currentPage + 1),
        value: currentPage + 1
      }
    ]

    //On retire les fleches si on est si la premiere ou derniere page
    structPagination = structPagination.filter((e,i) => (
        !((i == 0 && currentPage == 1) || (i == nbPage + 1 && currentPage == nbPage))
    ))

    return (
        <div className="bg-white rounded-md shadow-[2px_2px_6px_-1px_#DDD] mb-6 p-3 flex">
            {structPagination.map((e) => (
            <Link href={e.uri}>
                <div className={e.clickable ? "cursor-pointer rounded-md mx-1 " + (e.value == currentPage ? "bg-[#ff8c60]" : "hover:bg-gray-100") : "cursor-default pointer-events-none"}>
                    <div className={"h-7 w-7 font-semibold p-2 mx-[1px] flex items-center justify-center " + (e.value == currentPage ? "text-white" : "text-gray-400") } >
                        {e.label}
                    </div>
                </div>
            </Link>
            ))}
        </div>
    )
}