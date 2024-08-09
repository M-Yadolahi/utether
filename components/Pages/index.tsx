import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import Image from 'next/image';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles


  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />

      <Window title={"قیمت تتر (دلار)"} style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>
      <br-x/>


        <div style={{width:"30rem", height:150, backgroundColor:"#F6F6F6", borderRadius:10 ,display:"flex", marginRight:"14rem", marginTop:"2rem"
        }}>
          
          <img
            src="/tether-usdt-logo.png"
            alt="tether-logo"
            style={{width:"3rem",height:"3rem",display:"flex",position:"absolute", marginRight:"6.5rem",marginTop:"-1.35rem"}}/>          
          
          
          <p style={{fontSize:"14px",marginRight:"11.5rem",marginTop:"1.5rem"}}>قیمت لحظه ای تتر</p>  
          <p style={{fontSize:"18px",position:"absolute",right:"27.5rem",top:"8rem"}}>{(props.p.price as number).toLocaleString("fa-IR")}</p>
          
          
          

          <div style={{display: "flex",
            justifyContent: "space-between",
            alignItems: "center",       
            padding: "10px",
            gap:"2rem",       
            position: "absolute",              
            top: "10rem",                       
            left: "15.8rem"}}>

          <br-x/>
          <br-xx/>
          <p> حداقل قیمت :{ (Number(props.p.last24hMin) as number).toLocaleString("fa-IR")}</p> 

          <br-x/>
          <br-xx/>

          <p> حداکثر قیمت :{(Number(props.p.last24hMax) as number).toLocaleString("fa-IR")}</p>

          <br-x/>
          <br-xx/>

          
          </div>
           
          <p style={{display: "flex",position: "absolute",top:"13.5rem",right:"27rem",backgroundColor:"#E2E2E2",color:"red",borderRadius:"2rem",border:"solid 1px #202020",fontSize:"16px",justifyContent:"center",alignItems:"center",  width:"4rem", height:"2rem"}}>{" ٪" + (Number(props.p.diff24d) as number).toLocaleString("fa-IR")}</p>
          
        </div>

        

        <br-x/>

      

        <br-x/>
        <br-x/>


        <div
          style={{
            width: "30rem",
            backgroundColor: "#F6F6F6",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
            margin: "0 auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #202020",
                    borderRadius: "5px",
                  }}
                >
                  مدت
                </th>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #202020",
                    borderRadius: "5px",
                  }}
                >
                  درصد تغییر
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #202020",
                    borderRadius: "5px",
                  }}
                >
                  ۲۴ ساعت
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #202020",
                    borderRadius: "5px",
                    color:"red"
                  }}
                >
                  {"٪" + Number(props.p.diff24d).toLocaleString("fa-IR")}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #202020",
                    borderRadius: "5px",

                  }}
                >
                  ۷ روز
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #202020",
                    borderRadius: "5px",
                    color: "red"
                  }}
                >
                  {"٪" + Number(props.p.diff7d).toLocaleString("fa-IR")}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #202020",
                    borderRadius: "5px",
                  }}
                >
                  ۱ ماه
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #202020",
                    borderRadius: "5px",
                    color: "green"
                  }}
                >
                  {"٪" + Number(props.p.diff30d).toLocaleString("fa-IR")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        <br-x />
        <br-x />

        <div
          style={{
            width: "100%",
            textAlign: "center",
            margin: "20px 0",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#E2E2E2",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#333",
              border: "2px solid #202020",
            }}
          >
            Made by the Research Team of Rutherford
          </div>
        </div>



      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

    let res = await fetch("http://api.tetherland.com/currencies")
    let data = await res.json()
    let p = data.data.currencies.USDT


  return {
    props: {
      data: global.QSON.stringify({
        p,
        session,
        // nlangs,
      })
    },
  }
}