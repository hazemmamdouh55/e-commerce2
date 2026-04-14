export interface ListingResponse<type> {
    result: number,
    metadata:MetaData,
    data:type[]
}

interface MetaData {
   currentPage: number,
   numberOfPages: number,
   limit: number
}