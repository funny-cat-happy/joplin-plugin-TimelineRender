document.addEventListener('joplin-noteDidUpdate', parseContent);
// window.addEventListener('load', parseContent);

if (/WebKit/i.test(navigator.userAgent)) { // sniff
    var _timer_life = setInterval(function() {
        if (/loaded|complete/.test(document.readyState)) {
            parseContent();
        }
    }, 10);
}


function parseContent() 
{
    if (_timer_life) clearInterval(_timer_life);
    const timelines = document.getElementsByClassName('timeline-container');
    for (var i=0; i<timelines.length; i++)
    {
        var timeline = timelines[i];
        // buildStruct(timeline,timeline.textContent.split("\\n"));
        buildStruct(timeline,timeline.textContent.split("\n"));
    }
}

function timelineNode(time,content)
{
    this.time=time;
    this.content=content;
}

function buildStruct(container,contentList)
{
    container.innerHTML="";
    let nodes=[]
    let timelineNodeList=[]
    for (let index = 0; index < contentList.length; index++) {
        if(contentList[index]!="")
        {
            nodes.push(contentList[index]);
        }
        else
        {
            let time="";
            let contents=[]
            let strArray=[]
            let regExp=new RegExp(/^\d{4}-\d{1,}-\d{1,}/);
            for (let nodeindex = 0; nodeindex < nodes.length; nodeindex++) 
            {
                if (nodeindex==0) 
                {
                    let clearContent=nodes[nodeindex].replace(/\s*/g,"");
                    if (regExp.test(clearContent)) 
                    {
                        strArray=clearContent.split('-');
                        if(strArray[1].length==1)
                        {
                            strArray[1]='0'+strArray[1];
                        }
                        if(strArray[2].length==1)
                        {
                            strArray[2]='0'+strArray[2];
                        }
                        clearContent=strArray[0]+'-'+strArray[1]+'-'+strArray[2];
                        time=new Date(clearContent);
                    }
                    else
                    {
                        time="error fommat";
                    }
                }
                else
                {
                    contents.push(nodes[nodeindex]);
                }
            }
            timelineNodeList.push(new timelineNode(time,contents));
            nodes=[];
        }
    }
    insertElem(container,timelineNodeList);
}

function insertElem(container,nodes) 
{
    for (let index = 0; index < nodes.length; index++) {
        let timelineElem = document.createElement("div");
        timelineElem.className="timeline";
        let timelineLeftElem=document.createElement("div");
        timelineLeftElem.className="timeline-left";
        let timelineDotElem=document.createElement("div");
        timelineDotElem.className="timeline-dot-past";
        if(typeof(nodes[index].time)=="object")
        {
            timelineLeftElem.innerHTML=`<p>${nodes[index].time.getFullYear()}-${nodes[index].time.getMonth()+1}-${nodes[index].time.getDate()}</p>`;
            if (nodes[index].time.setHours(0,0,0,0)==new Date().setHours(0,0,0,0)) 
            {
                timelineDotElem.className="timeline-dot-current";
            }
            else if(nodes[index].time > new Date())
            {
                timelineDotElem.className="timeline-dot-future";
            }
        }
        else
        {
            timelineLeftElem.innerHTML=`<p>${nodes[index].time}</p>`;
        }
        let timelineRightElem=document.createElement("div");
        timelineRightElem.className="timeline-right";
        let htmlContent="";
        for (let contentindex = 0; contentindex < nodes[index].content.length; contentindex++) {
            htmlContent+=`<p>${nodes[index].content[contentindex]}</p>`
            
        }
        timelineRightElem.innerHTML=htmlContent;
        timelineElem.appendChild(timelineLeftElem);
        timelineElem.appendChild(timelineDotElem);
        timelineElem.appendChild(timelineRightElem);
        container.appendChild(timelineElem);
    }
}