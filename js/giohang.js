function chuyen(){
    window.location.href="giohang.html";
}

var itemList={
	// "images/sanpham/kiwi.jpg"
    "sp001":{"name":"Cà phê đen đá","price":19000, "photo":"img/sanpham/ca_phe.jpg"},
    "sp002":{"name":"Cà phê sữa đá","price":19000, "photo":"img/sanpham/ca-phe-sua.jpg"},
    "sp003":{"name":"Bạc xĩu","price":19000, "photo":"img/sanpham/bac-xiu-da.jpg"},
    "sp004":{"name":"CaCao đá xay","price":25000, "photo":"img/sanpham/ca_cao.jpg"},
    "sp005":{"name":"Việt quốc đá xay","price":25000, "photo":"img/sanpham/viet_quat.jpg"},
    "sp006":{"name":"Espreso","price":40000, "photo":"img/sanpham/espreso.jpg"},
    "sp007":{"name":"Hồng trà chân trâu","price":25000, "photo":"img/sanpham/hong_tra.jpg"},
    "sp008":{"name":"Trà sữa truyền thống","price":25000, "photo":"img/sanpham/tra_sua_tt.jpg"},
    "sp009":{"name":"Trà sữa thái xanh","price":25000, "photo":"img/sanpham/tra_sua_thai.png"},
    "sp0010":{"name":"Trà Lài đác thơm","price":25000, "photo":"img/sanpham/tra-lai-dac-thom.jpg"},
    "sp0011":{"name":"Trà nhãn lài","price":25000, "photo":"img/sanpham/tra-nhan-1.jpg"},
    "sp0012":{"name":"Trà việt quất","price":25000, "photo":"img/sanpham/batch_tra-viet-quat-1.jpg"},
    "sp0013":{"name":"Sinh tố bơ","price":20000, "photo":"img/sanpham/sinh-to-bo.jpg"},
    "sp0014":{"name":"Sinh tố dâu","price":20000, "photo":"img/sanpham/sinhtodau.jpg"},
    "sp0015":{"name":"Sinh tố samboche","price":20000, "photo":"img/sanpham/samboche.jpg"},
};

function addCart(code){
    var number=parseInt(document.getElementById(code).value); 
    var name=itemList[code].name;
    if(number==0)
    return;
    if(typeof localStorage[code] === "undefined"){
        window.localStorage.setItem(code,number);   
    }
    else{
        var current=parseInt(window.localStorage.getItem(code));
        if(current+number>100)
        {
            window.localStorage.setItem(code,100);
            alert("Mỗi mặt hàng chỉ có thể đặt 100 sản phẩm cho mỗi đơn hàng. Bạn đã đặt 100 sản phẩm của "+name+" này.");
            return; 
        }
        else
            window.localStorage.setItem(code,current+number);
        }
        alert("Đã cập nhật sản phẩm "+name+" với số lượng là "+number+" vào giỏ hàng. Số lượng sản phẩm "+name+" đã đặt là "+parseInt(window.localStorage.getItem(code))+".");
}


function getDiscountRate(){
    var d=new Date();//lấy ngày hiện tại của máy tính
    var weekday=d.getDay();//lấy ngày trong tuần
    var totalMins=d.getHours()*60+d.getMinutes();//đổi thời gian hiện tại ra số phút trong ngày. 
    if(weekday>=1 && weekday<=3&&((totalMins>=420 && totalMins<=660)||(totalMins>=780 && totalMins<=1020)))
    return 0.1;
    else return 0;
}

function showCart(){
	var formatter = new Intl.NumberFormat('vi-VN',
	{style: 'currency', currency: 'VND'});
	var container=document.getElementById("cartDetail").getElementsByTagName('tbody')[0];
	container.innerHTML="";
	var sum=0;//tổng mỗi mặt hàng
	var totalPreTax=0;//tổng trước thuế
	var discountRate=getDiscountRate();//tỉ lệ khuyến mãi
	var taxRate=0.1;//tỉ lệ thuế
	var discount=0;//tiền giảm giá
	var tax=0;//tiền thuế.
	for(var i=0;i<window.localStorage.length;i++){
		if(typeof itemList[localStorage.key(i)] === "undefined")
		continue;
		var tr=document.createElement("tr");
		var photoCell=document.createElement("td");
		var nameCell=document.createElement("td");
		var priceCell=document.createElement("td");
		var numberCell=document.createElement("td");
		var sumCell=document.createElement("td");
		var removeCell=document.createElement("td");
		var removeLink=document.createElement("a");
		var item=itemList[localStorage.key(i)];
		var number=localStorage.getItem(localStorage.key(i));
		photoCell.style.textAlign="center";
		photoCell.innerHTML="<img src='"+item.photo+"' class='round-figure' width='100px'/>";
		nameCell.innerHTML=item.name;
		priceCell.innerHTML=formatter.format(item.price);
		priceCell.style.textAlign="right";
		numberCell.innerHTML=number;
		numberCell.style.textAlign="right";
		sum=number*item.price;
		sumCell.innerHTML=formatter.format(sum);
		sumCell.style.textAlign="right";
		removeLink.innerHTML="<i class='fa fa-trash icon-pink'></i>";
		removeLink.setAttribute("href","#");
		removeLink.setAttribute("data-code",localStorage.key(i));
		removeLink.onclick=function(){
			removeCart(this.dataset.code);
		};
		removeCell.style.textAlign="center";
		removeCell.appendChild(removeLink);
		tr.appendChild(photoCell);
		tr.appendChild(nameCell);
		tr.appendChild(numberCell);
		tr.appendChild(priceCell);
		tr.appendChild(sumCell);
		tr.appendChild(removeCell);
		container.appendChild(tr);
		totalPreTax+=sum; 
	}
	var discount=totalPreTax*discountRate;
	var tax=(totalPreTax-discount)*taxRate;
	document.getElementById("bill_pre_tax_total").innerHTML=formatter
	.format(totalPreTax);
	document.getElementById("bill_discount").innerHTML=discountRate+" x A = "+formatter.format(discount);
	document.getElementById("bill_tax").innerHTML=formatter
	.format(tax);
	document.getElementById("bill_total").innerHTML=formatter
	.format(totalPreTax-discount+tax);
}


function removeCart(code){
	if(typeof window.localStorage[code] !== "undefined"){
		//xóa sản phẩm khỏi localStorage
		window.localStorage.removeItem(code);
		//Xóa nội dung của phần thân của bảng (<tbody>)
		document.getElementById("cartDetail").getElementsByTagName('tbody'
		)[0].innerHTML="";
		//Hiển thị lại nội dung của đơn hàng
		showCart();
	} 
}/*Hàm hiển thị nội dung keyword trong trang timkiem.html**/
function showSearch()
{
var url = new URL(window.location);
var ws = url.searchParams.get("words");
document.getElementById("searchDetail").innerHTML="<h1>Từ khóa tìm kiếm</h1> <b>"+ws+"</b>";
}

function showSearch(){
    var url = new URL(window.location);
    var ws = url.searchParams.get("words"); document.getElementById("searchDetail").innerHTML="<h1>Từ khóa tìm kiếm</h1> <b>"+ws+"</b>";
}

window.onstorage = () => {showCart();};


//lab4//