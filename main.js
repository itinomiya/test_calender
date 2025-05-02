(() =>{
    //tab用変数
    const $doc = document;
    const $tab = $doc.getElementById('js-tab');
    const $tab_nav = $tab.getElementsByClassName('tab_nav')
    // const $nav = $tab.querySelectorAll('[data-nav]')
    const $comtent  =$tab.querySelectorAll('[data-content]')

    //カレンダー用変数
    const date = new Date();
    const year = date.getFullYear();
    let dayCount = 1;


    let createHtml = '';

    //カレンダー出力
    const createCalndar = (m)=>{
        let month = m + 1;
        let firstDate = new Date(year, m, 1);
        let firstDay = firstDate.getDay();
        let lastDate = new Date(year, month , 0); 
        let lastDayCount = lastDate.getDate();
        
        dayCount = 1;
        createHtml = '<h1>' + year + '/' + month +'</h1>';
        createHtml += '<table>' + '<tr>';

        const weeks = ['日','月','火','水','木','金','土'];
        for (let i = 0; i < weeks.length; i++)
        {   
            if(i == 0){
                createHtml += '<th class = "Sunday">' + weeks[i] + '</th>';
            }else if(i == 6){
                createHtml += '<th class = "Saturday">' + weeks[i] + '</th>';
            }else{
            createHtml += '<th>' + weeks[i] + '</th>';
            }
        }
        createHtml += '</tr>';

        for (let j = 0; j < 6; j++){
            createHtml +='<tr>';
            for(let k = 0; k < 7; k++){
                if(j == 0 && k < firstDay){
                    if(k == 0){
                        createHtml += '<td class = "Sunday"></td>';
                    }else if(k == 6){
                        createHtml += '<td class = "Saturday"></td>';
                    }else{
                        createHtml +='<td></td>'
                    }
                }else if(dayCount > lastDayCount){
                    if(k == 0 && j != 0){
                        break;
                    }else if(k == 0){
                        createHtml += '<td class = "Sunday"></td>';
                    }else if(k == 6){
                        createHtml += '<td class = "Saturday"></td>';
                    }else{
                        createHtml +='<td></td>'
                    }
                }else if(k == 0){
                    createHtml += '<td class = "Sunday">' + dayCount + '</td>';
                    dayCount++
                }else if(k == 6){
                    createHtml += '<td class = "Saturday"> ' + dayCount + '</td>';
                    dayCount++
                }
                else{
                    createHtml += '<td>' + dayCount + '</td>';
                    dayCount++
                }
            }

            createHtml += '</tr>'
        }
        createHtml += '</table>'

        $comtent[m].innerHTML = createHtml;

    }

    const createTab = (i) =>{
        createHtml = '<a href = "" class="tab_nav_items is-active " data-nav="' + i + '" >1月</a>';
        $tab_nav.innerHTML = createHtml;
    }

    //カレンダー追加
    for(let i =0; i<$comtent.length; i++){
        createTab(i);
        createCalndar(i);
    }

    const $nav = $tab.querySelectorAll('[data-nav]')

    const init = () =>{
        $comtent[0].style.display = 'block';
    }
    init();

    const handleClick =(e) =>{
        e.preventDefault();
        
        //クリックされたnavとそのdataを取得
        const $this = e.target;
        const targetValue = $this.dataset.nav;
        //対象外のnav,contentをすべてリセット
        for(let i = 0; i < $nav.length; i++){
            $nav[i].classList.remove('is-active');
            $comtent[i].style.display = "none";

        }
        
        //対象をアクティブ化
        $tab.querySelectorAll('[data-content="' + targetValue + '"]')[0].style.display = 'block';
        $nav[targetValue].classList.add('is-active');

    }

    //全$nav要素にhandleClick適用
    let index = 0;
    for(;index < $nav.length; index++){
        $nav[index].addEventListener('click', (e) => handleClick(e));
    }

})();
