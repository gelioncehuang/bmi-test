//宣告變數
var content=document.querySelector('.content');
var data=JSON.parse(localStorage.getItem('datalist')) ||[];
var send=document.querySelector('.send');
var word=document.querySelector('.send a');
var word2=document.querySelector('.send p')
var condition=document.querySelector('.status');
var dealll=document.querySelector('.delall');


//監聽事件
send.addEventListener('click',cacutate,false);
content.addEventListener('click',cancel);
dealll.addEventListener('click',clearall);
//時間計算
function gettime(){
    let nowtime=new Date();
    let time=nowtime.getFullYear()+'-'+(nowtime.getMonth()+1)+'-'+nowtime.getDate()+'-'+nowtime.getHours()+':'+nowtime.getMinutes();
    return time//時間取得計算
}

//狀態判斷
function stat(items){
    if(items<18.50){
        return '體重過輕'
    }else if(items>18.50 && items<24.99){
        return '健康體重'
    }else if(items>=25.00 && items<29.99){
        return '體重過重'
    }else if(items>=30.00 && items<34.99){
        return '輕度肥胖'
    }else if(items>=35.00 && items<39.99){
        return '中度肥胖'
    }else if(items>40){
        return '重度肥胖'
    }else{
        alert('資料輸入錯誤');
    }

}

function liststyle(items){
    if(items<18.50){
        return 'list-light'
    }else if(items>18.50 && items<24.99){
        return 'list-good'
    }else if(items>=25.00 && items<29.99){
        return 'list-overweight'
    }else if(items>=30.00 && items<34.99){
        return 'list-lfat'
    }else if(items>=35.00 && items<39.99){
        return 'list-lfat'
    }else if(items>40){
        return 'list-hfat'
    }else{
        return ''
    }
}

//點擊看結果後觸發事件
function cacutate(e){
    e.preventDefault();
    var cm=document.querySelector('.cm').value;//13-16為計算bmi
    var height=document.querySelector('.cm').value/100;
    var kg=document.querySelector('.kg').value;
    var bmi=(kg/(height*height)).toFixed(2);
    var inf={
        status:stat(bmi),
        listcolor:liststyle(bmi),
        hei:cm,
        wei:kg,
        bm:bmi,
        time:gettime()
    }
    data.push(inf);
    btnstatus(data)
    updatelist(data)
    var span=document.querySelector('.content span');
    span.setAttribute('class','fontsize');
    localStorage.setItem('datalist',JSON.stringify(data));
}
//網頁渲染
function updatelist(item){
    let len=item.length;
    //console.log(len);
    let str='';
    var tittle='<h1>BMI紀錄</h1>'
    for(var i=0;i<len;i++){
        let bmi=item[i].bm;
        let listcolor=item[i].listcolor;
        let status=item[i].status;
        let wei=item[i].wei;
        let hei=item[i].hei;
        let time=item[i].time;

        if(bmi<18.50){
            send.setAttribute('class','light');
            word.setAttribute('style','color:#31baf9;margin-left:20px')
            word.textContent=bmi
            word2.textContent='BMI';
            word2.setAttribute('style','color:#31baf9;margin-left: 45px;font-size: 15px;')
            condition.textContent='體重過輕'
            condition.setAttribute('style','color:#31baf9;margin-left: 20px;font-size: 30px;margin-top: 60px;')
            //過輕
        }else if(bmi>18.50 && bmi<24.99){
            send.setAttribute('class','good');
            word.setAttribute('style','color:#86d73f;margin-left:20px')
            word.textContent=bmi;
            word2.textContent='BMI';
            word2.setAttribute('style','color:#86d73f;margin-left: 45px;font-size: 15px;')
            condition.textContent='健康體重'
            condition.setAttribute('style','color:#86d73f;margin-left: 20px;font-size: 30px;margin-top: 60px;')
            //良好
        }else if(bmi>=25.00 && bmi<29.99){
            send.setAttribute('class','overweight');
            word.setAttribute('style','color:#ff982d;margin-left:20px')
            word.textContent=bmi;
            word2.textContent='BMI';
            word2.setAttribute('style','color:#ff982d;margin-left: 45px;font-size: 15px;')
            condition.textContent='體重過重'
            condition.setAttribute('style','color:#ff982d;margin-left: 20px;font-size: 30px;margin-top: 60px;')
            //體重過重
        }else if(bmi>=30.00 && bmi<34.99){
            send.setAttribute('class','lfat');
            word.setAttribute('style','color:#ff6c03;margin-left:20px')
            word.textContent=bmi;
            word2.textContent='BMI';
            word2.setAttribute('style','color:#ff6c03;margin-left: 45px;font-size: 15px;')
            condition.textContent='輕度肥胖'
            condition.setAttribute('style','color:#ff6c03;margin-left: 20px;font-size: 30px;margin-top: 60px;')
            //輕度肥胖
        }else if(bmi>=35.00 && bmi<39.99){
            send.setAttribute('class','lfat');
            word.setAttribute('style','color:#ff6c03;margin-left:20px')
            word.textContent=bmi;
            word2.textContent='BMI';
            word2.setAttribute('style','color:#ff6c03;margin-left: 45px;font-size: 15px;')
            condition.textContent='中度肥胖'
            condition.setAttribute('style','color:#ff6c03;margin-left: 20px;font-size: 30px;margin-top: 60px;')
            //中度肥胖
        }else if(bmi>40.00){
            send.setAttribute('class','hfat');
            word.setAttribute('style','color:#ff1200;margin-left:20px')
            word.textContent=bmi;
            word2.textContent='BMI';
            word2.setAttribute('style','color:#ff1200;margin-left: 45px;font-size: 15px;')
            condition.textContent='重度肥胖'
            condition.setAttribute('style','color:#ff1200;margin-left: 20px;font-size: 30px;margin-top: 60px;')
            //重度肥胖
        }
            str+='<ul class="'+listcolor+'" dat-num"'+i+'"><li>'+status+'</li><li><span>BMI</span>'+bmi+'</li><li>'+wei+'<span>kg</span>'+'</li><li>'+hei+'<span>cm</span>'+'</li><li>'+time+'</li><a href="#" class="del">刪除</a></ul>' 
    }
    content.innerHTML=tittle+str;
}

function btnstatus(item){
    let len=item.length;
    console.log(len);
    let str='';
    
}

//目前做到 刪除全部尚未抓取監聽事件、變更看結果的資料

//https://codepen.io/kevin-hsu-the-encoder/pen/QWyQwGB?editors=1011(參考資料)
//https://upload.cc/i1/2020/07/04/fAIxKk.png(小圈圈)


//刪除資料(觸發事件)
function cancel(e){
    e.preventDefault();
    var node=e.target.nodeName;
    var num=e.target.dataset.num;
    if(node!=="A"){return}
    data.splice(num,1);
    localStorage.getItem(data);
    updatelist(data)
}
//清除全部
function clearall(e){
    e.preventDefault();
    localStorage.removeItem('datalist');
    data=[];
    updatelist(data)
}

