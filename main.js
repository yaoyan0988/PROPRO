//go top功能設定
$(window).scroll(function () {
    //這個方法獲取了瀏覽器目前的滾動位置。
    if ($(window).scrollTop() > 200) {
      //如果滾動位置超過 200 像素，則執行以下操作：
      if ($(".goTop").hasClass("hide")) {
        $(".goTop").toggleClass("hide");
      }
    } else {
      $(".goTop").addClass("hide");
    }
  });

$(".jq-goTop").click(function (e) {
    e.preventDefault();
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      600
    );
});

//橫向滑動
const initSlider = () => {
  //圖片區塊
  const imageList = document.querySelector(".slider-wrapper .image-list");
  //左右切換按鈕
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  //滑桿長條
  const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
  //滑趕上的滑塊
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  //計算照片區塊寬度
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  
  //當滑鼠按下滑塊時觸發以下行為
  scrollbarThumb.addEventListener("mousedown", (e) => {
      //紀錄按下滑塊時的水平位置
      const startX = e.clientX;
      //讀取滑塊左側位置
      const thumbPosition = scrollbarThumb.offsetLeft;
      //計算滑塊減去滾動軸後剩餘的空間
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
      
      // 當滑鼠移動時，計算滑鼠的水平位移 deltaX，並根據滑鼠的位置調整滑塊的位置。確保滑塊在指定範圍內移動，並計算相應的滾動位置
      const handleMouseMove = (e) => {
          const deltaX = e.clientX - startX;
          const newThumbPosition = thumbPosition + deltaX;
          const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
          const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
          
          scrollbarThumb.style.left = `${boundedPosition}px`;
          imageList.scrollLeft = scrollPosition;
      }
      // 當滑鼠放開時，移除滑鼠移動和放開事件的監聽器。
      const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
      }
      // 添加事件監聽器：在滑鼠按下時，添加滑鼠移動和放開事件的監聽器，以實現拖曳交互
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
  });
  // 這個迴圈遍歷所有的輪播按鈕，並為每個按鈕添加點擊事件監聽器。
  slideButtons.forEach(button => {
      // 當輪播按鈕被點擊時，觸發這個事件。
      button.addEventListener("click", () => {
          // 根據按鈕的 ID 判斷是向前還是向後滑動。
          const direction = button.id === "prev-slide" ? -1 : 1;
          // 計算滑動的距離，即螢幕寬度乘以方向。
          const scrollAmount = imageList.clientWidth * direction;
          //使用 scrollBy 方法滑動圖片列表，並設定平滑的過渡效果。
          imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
  });
  //根據滾動位置來顯示或隱藏輪播按鈕。
  const handleSlideButtons = () => {
      slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
      slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  }
  // 根據圖片的滾動位置來更新滾動條的滑塊位置。
  const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
  }
  // 當圖片列表滾動時，調用這兩個函式。
  imageList.addEventListener("scroll", () => {
      updateScrollThumbPosition();
      handleSlideButtons();
  });
}
//添加了一個事件監聽器，當瀏覽器視窗大小改變時，會觸發 initSlider 函式。
window.addEventListener("resize", initSlider);
//添加了一個事件監聽器，當網頁完全載入時，會觸發 initSlider 函式。
window.addEventListener("load", initSlider);

//橫向測側欄
const navBar = document.querySelector("nav"),
      menuBtns = document.querySelectorAll(".fa-bars"),
      lists = document.querySelector(".lists");
    menuBtns.forEach((menuBtn) => {
      menuBtn.addEventListener("click", () => {
        navBar.classList.toggle("open");
      });
    });
    lists.addEventListener("click", () => {
      navBar.classList.remove("open");
    });