import { Place } from "@/types/place";

export const mockPlaces: Place[] = [
  {
    id: "1",
    name: "鼎泰豐",
    category: "restaurant",
    rating: 4.5,
    reviewCount: 2847,
    priceLevel: "$$$",
    address: "台北市大安區信義路二段194號",
    phone: "+886-2-2321-8928",
    website: "https://www.dintaifung.com.tw",
    hours: "11:00 - 21:00",
    isOpen: true,
    distance: "1.2 km",
    images: [
      "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800",
    ],
    coordinates: {
      lat: 25.0330,
      lng: 121.5654,
    },
    reviews: {
      latest: [
        {
          author: "王小明",
          rating: 5,
          text: "小籠包真的很好吃！皮薄餡多，湯汁鮮美。服務態度也很好，值得推薦。",
          date: "2024年1月15日",
        },
        {
          author: "李美華",
          rating: 4,
          text: "環境乾淨，食物品質穩定。就是假日人太多需要排隊。",
          date: "2024年1月10日",
        },
        {
          author: "張大同",
          rating: 5,
          text: "經典的台灣美食代表，帶外國朋友來都很滿意。",
          date: "2024年1月8日",
        },
      ],
      worst: [
        {
          author: "陳先生",
          rating: 2,
          text: "價格偏高，份量不多。等待時間太長。",
          date: "2023年12月20日",
        },
      ],
    },
  },
  {
    id: "2",
    name: "星巴克信義門市",
    category: "cafe",
    rating: 4.2,
    reviewCount: 1523,
    priceLevel: "$$",
    address: "台北市信義區松高路11號",
    phone: "+886-2-8780-5608",
    website: "https://www.starbucks.com.tw",
    hours: "07:00 - 22:00",
    isOpen: true,
    distance: "0.8 km",
    images: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800",
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800",
    ],
    coordinates: {
      lat: 25.0360,
      lng: 121.5680,
    },
    reviews: {
      latest: [
        {
          author: "林小姐",
          rating: 4,
          text: "環境舒適，適合工作或聊天。咖啡品質一如既往的穩定。",
          date: "2024年1月18日",
        },
        {
          author: "黃先生",
          rating: 4,
          text: "位置方便，服務親切。WiFi速度快。",
          date: "2024年1月16日",
        },
        {
          author: "劉小姐",
          rating: 5,
          text: "新推出的季節限定飲品很好喝！",
          date: "2024年1月14日",
        },
      ],
      worst: [],
    },
  },
  {
    id: "3",
    name: "台北101觀景台",
    category: "attraction",
    rating: 4.6,
    reviewCount: 8934,
    priceLevel: "$$$$",
    address: "台北市信義區信義路五段7號89樓",
    phone: "+886-2-8101-8898",
    website: "https://www.taipei-101.com.tw",
    hours: "09:00 - 22:00",
    isOpen: true,
    distance: "2.1 km",
    images: [
      "https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800",
      "https://images.unsplash.com/photo-1572816703439-d8b34c4dc93f?w=800",
    ],
    coordinates: {
      lat: 25.0339,
      lng: 121.5645,
    },
    reviews: {
      latest: [
        {
          author: "游客A",
          rating: 5,
          text: "景色壯觀！天氣好的時候可以看很遠。電梯速度超快。",
          date: "2024年1月17日",
        },
        {
          author: "Jennifer",
          rating: 5,
          text: "Must visit in Taipei! Amazing views and fast elevator.",
          date: "2024年1月15日",
        },
        {
          author: "陳太太",
          rating: 4,
          text: "值得一遊，但門票有點貴。建議傍晚去可以看日落和夜景。",
          date: "2024年1月12日",
        },
      ],
      worst: [
        {
          author: "王先生",
          rating: 2,
          text: "人太多了，拍照都要排隊。門票太貴。",
          date: "2023年11月30日",
        },
        {
          author: "李小姐",
          rating: 1,
          text: "天氣不好什麼都看不到，浪費錢。",
          date: "2023年10月15日",
        },
      ],
    },
  },
  {
    id: "4",
    name: "誠品信義店",
    category: "shopping",
    rating: 4.4,
    reviewCount: 3421,
    priceLevel: "$$",
    address: "台北市信義區松高路11號",
    phone: "+886-2-8789-3388",
    website: "https://www.eslite.com",
    hours: "11:00 - 22:00",
    isOpen: true,
    distance: "0.9 km",
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    ],
    coordinates: {
      lat: 25.0361,
      lng: 121.5682,
    },
    reviews: {
      latest: [
        {
          author: "書蟲",
          rating: 5,
          text: "書籍種類豐富，環境優雅。還有很多文創商品。",
          date: "2024年1月19日",
        },
        {
          author: "藝文愛好者",
          rating: 4,
          text: "不只是書店，更是文化空間。經常有展覽和活動。",
          date: "2024年1月16日",
        },
        {
          author: "媽媽",
          rating: 4,
          text: "兒童區很棒，小朋友很喜歡。",
          date: "2024年1月14日",
        },
      ],
      worst: [],
    },
  },
  {
    id: "5",
    name: "W Hotel Taipei",
    category: "hotel",
    rating: 4.7,
    reviewCount: 2156,
    priceLevel: "$$$$$",
    address: "台北市信義區忠孝東路五段10號",
    phone: "+886-2-7703-8888",
    website: "https://www.marriott.com/hotels/travel/tpewh-w-taipei/",
    hours: "24小時",
    isOpen: true,
    distance: "1.5 km",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
    ],
    coordinates: {
      lat: 25.0408,
      lng: 121.5676,
    },
    reviews: {
      latest: [
        {
          author: "商務旅客",
          rating: 5,
          text: "服務一流，設施現代。泳池很棒！位置絕佳。",
          date: "2024年1月20日",
        },
        {
          author: "度假客",
          rating: 5,
          text: "房間寬敞舒適，早餐豐盛。工作人員很專業。",
          date: "2024年1月18日",
        },
        {
          author: "情侶",
          rating: 4,
          text: "氣氛很好，適合慶祝特殊日子。",
          date: "2024年1月15日",
        },
      ],
      worst: [
        {
          author: "挑剔客",
          rating: 2,
          text: "價格太高，性價比不好。",
          date: "2023年12月10日",
        },
      ],
    },
  },
  {
    id: "6",
    name: "饒河街夜市",
    category: "attraction",
    rating: 4.3,
    reviewCount: 5678,
    priceLevel: "$",
    address: "台北市松山區饒河街",
    phone: "+886-2-2763-5733",
    website: "",
    hours: "17:00 - 00:00",
    isOpen: false,
    distance: "3.2 km",
    images: [
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    ],
    coordinates: {
      lat: 25.0510,
      lng: 121.5770,
    },
    reviews: {
      latest: [
        {
          author: "美食家",
          rating: 5,
          text: "胡椒餅必吃！還有很多道地小吃。",
          date: "2024年1月19日",
        },
        {
          author: "觀光客",
          rating: 4,
          text: "很有台灣特色的夜市，東西便宜又好吃。",
          date: "2024年1月17日",
        },
        {
          author: "在地人",
          rating: 4,
          text: "從小吃到大的夜市，推薦藥燉排骨。",
          date: "2024年1月15日",
        },
      ],
      worst: [
        {
          author: "潔癖者",
          rating: 1,
          text: "環境髒亂，人擠人。",
          date: "2023年11月20日",
        },
      ],
    },
  },
];