import { NextRequest, NextResponse } from "next/server";

export function GET (req :NextRequest){

    return NextResponse.json({
        message:"success",
        data:[
            {name:"brand 1" ,image:"patch of the image", id:'8w7chu77'},
            {name:"brand 2" ,image:"patch of the image", id:'8w7chu77'},
            {name:"brand 3" ,image:"patch of the image", id:'8w7chu77'},
            {name:"brand 4" ,image:"patch of the image", id:'8w7chu77'}
            ],
            results:4
    })
}