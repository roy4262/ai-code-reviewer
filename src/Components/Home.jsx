import React, { useState } from 'react'
import {GoogleGenAI} from '@google/genai';



const Home = () => {
    const [code,setCode]=useState("");
    const [reviewCode,setReviewCode]=useState("");
    const [loading,setLoading]=useState(false);
    const [dark,setDark]=useState(true);


   const handleClear = ()=>{
    setCode("");
    setReviewCode("");
    setLoading(false);
   }



    const handleReviewCode = async()=>{
      setLoading(true);
      const prompt = `
      You are an experienced developer. Analyze and review the following code:
      - Provide a summary
      - Detect bugs or issues
      - Suggest improvements and optimizations code:${code}`;
      const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API});
      const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: prompt,
                config: {
                        tools: [{ codeExecution: {} }],
                        },
            });
           
     const parts = response?.candidates?.[0]?.content?.parts || [];

     const data=parts.map(part=>part.text).join('\n\n');
     setReviewCode(data);
     console.log(data);
};

  return (
    <>
   
        
    <div className={`min-h-screen p-8 flex flex-col ${dark?"bg-black text-white":"bg-gray-100"}`}>  
       {dark ? <img onClick={()=>setDark(false)} className='w-11 h-11 rounded-3xl cursor-pointer' alt='dark-mode-on' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYpaKupXAgRs3FxQHb0jTauOvDTNZdv7zGfnuCdy6saNz7g3BP1gdOQpJGE7cdQRlAg4A&usqp=CAU"/>
         : <img onClick={()=>setDark(true)}className='w-11 h-11 rounded-3xl cursor-pointer' alt='dark-mode-off' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4D3dmnbuy70dN-91V3CbRUX_b9CKfrvcbf2yd7asnX0wDhmDNf7eKg10z3H93qgDhoTg&usqp=CAU"/>
        }
       
        <h1 className='text-3xl mb-4 font-bold flex flex-col items-center '>Ai Code Reviewer</h1>
        <div className='flex flex-col items-center w-full '>
            <textarea
              className={`
                h-40 sm:h-96 
                w-full sm:w-1/2 
                p-4 font-mono rounded-3xl overflow-auto hide-scrollbar
                ${dark
                  ? "bg-black text-white border-gray-600 placeholder-gray-400"
                  : "bg-white text-black border-gray-300 placeholder-gray-500"
                } border`
              }
              placeholder='paste code here..'
              onChange={(e) => setCode(e.target.value)}
              value={code}
            />

          
        </div>
        
     <div className='flex justify-center items-center mt-4'>
          <button
        className='bg-blue-600 text-white rounded hover:bg-blue-700 w-20 h-8'
        onClick={handleReviewCode}
        
        >{loading?"Reviewing..":"Review"}</button>

        <button 
         className='ml-4 bg-blue-600 text-white rounded hover:bg-blue-700 w-20 h-8 flex items-center justify-center'
         onClick={handleClear}
        >Clear</button>
     </div>
        
        {reviewCode && (
          <div className="flex justify-center mt-6">
            <div className={`p-4 rounded-3xl w-full max-w-4xl ${
              dark
                ? "bg-black text-white border border-gray-600 placeholder-gray-400"
                : "bg-white text-black border border-gray-300 placeholder-gray-500"
            }`}>
              <h2 className='text-xl font-semibold mb-2'>Review Result:</h2>
              <pre className='whitespace-pre-wrap font-mono'>{reviewCode}</pre>
            </div>
          </div>
        )}
      
    </div>
    </>
  )
}

export default Home;