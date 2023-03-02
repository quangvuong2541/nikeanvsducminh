// rcc
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import MainContainer from '../../components/MainContainer';
//  hook
import * as action from "../../components/ListProduct/module/action/action"
export default function HomePage() {
    const titleTrending = "Trending"
    const titleMoreNike = "MoreNike"
    const carouselImg = [
        "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1423,c_limit/9064fe24-7ac5-4baa-a7ee-8d15bb3a11ba/men-s-shoes-clothing-accessories.png",
        "https://static.nike.com/a/images/f_auto/dpr_1.0/w_1229,c_limit/e04d1808-9792-46ba-bcbd-3b2302a40b31/nike-by-you-custom-shoes.jpg",
    ];
    const dataTrending = [
        {
            img:
                "https://static.nike.com/a/images/f_auto/dpr_1.0/h_700,c_limit/3bd36415-c20f-4521-9391-f60fe8beef8c/nike-just-do-it.jpg",
            title: "LeBron 18 'Equation'",
            button: "Shop",
        },
        {
            img:
                "https://static.nike.com/a/images/f_auto/dpr_1.0/h_700,c_limit/16416ae4-9d79-4614-be7b-c41d8541f56b/nike-just-do-it.png",
            title: "Sisterhood of Sport Collection",
            button: "Shop",
        },
    ];

    const dataMoreNike = [
        {
            img:
                "https://static.nike.com/a/images/f_auto/dpr_2.0/w_587,c_limit/a8c6d7f6-6d2f-46af-b9bd-8be808dda1cf/nike-just-do-it.jpg",
            titleButton: "Men's",
        },
        {
            img:
                "https://static.nike.com/a/images/f_auto/dpr_2.0/w_587,c_limit/595336c7-94a3-4a5e-ad6d-65a1f6ae82da/nike-just-do-it.jpg",
            titleButton: "Women's",
        },
        {
            img:
                "https://static.nike.com/a/images/f_auto/dpr_2.0/w_587,c_limit/d0ca9b63-2a15-41eb-8c86-8d121987f715/nike-just-do-it.jpg",
            titleButton: "Kid's",
        },
    ];

    const merchMenu = [
        {
            id: 1,
            heading: "Icons",
            title1: "Air Force 1",
            title2: "Huarache",
            title3: "Air Max 90",
            title4: "Air Max 95",
            title5: "Air Max 97",
            title6: "Air Max 270",
            title7: "Air Max 720",
            title8: "All Air Max",
            title9: "Vapormax",
        },
        {
            id: 2,
            heading: "Shoes",
            title1: "All Shoes",
            title2: "Custom Shoes",
            title3: "Jordan Shoes",
            title4: "Running Shoes",
            title5: "Basketball Shoes",
            title6: "Football Shoes",
            title7: "Gym & Training Shoes",
            title8: "Lifestyle Shoes",
        },
        {
            id: 3,
            heading: "Clothing",
            title1: "All Clothing",
            title2: "Modest Wear",
            title3: "Hoodies & Pullovers",
            title4: "Shirts & Tops",
            title5: "Jackets",
            title6: "Compression & Nike Pro",
            title7: "Trousers & Leggings",
            title8: "Shorts",
        },
        {
            id: 4,
            heading: "Kid's",
            title1: "Infant & Toddler Shoes",
            title2: "Kids' Shoes",
            title3: "Kids' Jordan Shoes",
            title4: "Kids' Basketball Shoes",
            title5: "Kids' Running Shoes",
            title6: "Kids' Clothing",
            title7: "Kids' Backpacks",
            title8: "Kids' Socks",
        },
    ];
    const dispatch  = useDispatch();
    useEffect(() => {
        dispatch(action.actGetProductAPI("male", "shoes"))
    },[])
    return (
        <div>
            <MainContainer
                carouselImg={carouselImg}
                titleTrending={titleTrending}
                dataTrending={dataTrending}
                titleMoreNike={titleMoreNike}
                dataMoreNike={dataMoreNike}
                merchMenu={merchMenu}
            />
        </div>
    )
}
