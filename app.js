const form=document.getElementById('form');
const txt=document.getElementById('text');
const price = document.getElementById('amount');

const inc=document.getElementById('money-plus');
const exp=document.querySelector('#money-minus');
const list=document.querySelector('#list');

const balance = document.getElementById('balance');

let dels=document.querySelectorAll('button.delete-btn'); 

// console.log(dels);

{/* <li class="minus">
Cash <span>-$400</span><button class="delete-btn">x</button>
</li>  */}

let Trans =  StorgaeVerif('Transactions');

let income= StorgaeVerif('income');
let Expense= StorgaeVerif('Expense');


if( income.length === 0 ){ income.push(0);  localStorage.setItem('income', JSON.stringify(income));  }
if( Expense.length === 0){ Expense.push(0); localStorage.setItem('Expense', JSON.stringify(Expense)); }

function calBalance(){
    let bl=income[0]-Expense[0];
    balance.textContent ='$'+ bl ;
}

calBalance();



function addtoHistory(it){
   const li=document.createElement('li');
    li.appendChild(document.createTextNode(it[0]));

    const span=document.createElement('span');
          span.appendChild(document.createTextNode(it[1]+'$'));

    li.appendChild(span);
    

    if( parseFloat(it[1]) < 0 )
      li.className = 'minus';
    else {
        li.className = 'plus';
    }

    const btn = document.createElement('button');
    btn.className = 'delete-btn';
    btn.innerText = 'x';

    li.appendChild(btn);
    list.appendChild(li);

    dels=document.querySelectorAll('button.delete-btn'); 
    dels.forEach(function(del){
        del.addEventListener('click',Supp);
     });
    //  console.log(dels);

}


function reloadHistory(){
    list.innerHTML = '';

    Trans.forEach(function(Tran){
        addtoHistory(Tran);
    })
}

 reloadHistory();
 addIncExp();

function addIncExp(){
   let income = StorgaeVerif('income');
   let expense= StorgaeVerif('Expense');
     inc.textContent='+$'+income[0];
     exp.textContent='-$'+expense[0];
}




function Addtolocal(Tr){
       if(txt.value ==='' || price.value === ''){
           alert('Entrez tous les champs');
       }
       else{
        Trans =  StorgaeVerif('Transactions');
        Trans.push(Tr);
        localStorage.setItem('Transactions', JSON.stringify(Trans));

        addtoHistory(Tr);

        if( parseFloat(Tr[1])>0 ){
            income= StorgaeVerif('income'); 
            income[0]+=parseFloat(Tr[1]);
            localStorage.setItem('income', JSON.stringify(income));  
             
         }
         else{
             let abs=Math.abs(parseFloat(Tr[1]));
             Expense= StorgaeVerif('Expense');
              Expense[0]+=abs;
              localStorage.setItem('Expense', JSON.stringify(Expense));
         }
         alert('Task saved');
       }
}


function StorgaeVerif(items){
    let Trans;
        if(localStorage.getItem(items) === null) {
            Trans = [];
        } else {
            Trans = JSON.parse(localStorage.getItem(items));  
        }
   return Trans;
}



form.addEventListener('submit',function(e){
   Addtolocal( [txt.value , price.value ] );
   addIncExp();
   calBalance();
   e.preventDefault();
})


dels=document.querySelectorAll('button.delete-btn'); 
dels.forEach(function(del){
    del.addEventListener('click',Supp);
 });

//  console.log(dels);
function Supp(e){

    let vals= e.target.parentElement.innerText.split('\n'),
          txt=vals[0],  
          val=parseFloat( vals[1].substring(0,vals[1].length-1) );

    let li = e.target.parentElement;
    // console.log(txt,val); 
     list.removeChild(li);
    
    for( var i = 0; i < Trans.length; i++){ 
       if ( Trans[i][0] === txt) { 
         Trans.splice(i, 1); 
        }
    }
    
    localStorage.setItem('Transactions', JSON.stringify(Trans));

    if(val > 0){
         income[0] -=val; 
         localStorage.setItem('income', JSON.stringify(income));
    }
      else  {
        Expense[0] +=val; 
        localStorage.setItem('Expense', JSON.stringify(Expense));

      }
      addIncExp();
      calBalance();
}





//  <li class="minus">
// Cash <span>-$400</span><button class="delete-btn">x</button>
// </li>  