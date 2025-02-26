import React, { useState, useEffect }from 'react'

const ScrollButons = () => {
  const [isTopVisible, setIsTopVisible] = useState(false)
  const [isBottomVisible, setIsBottomVisible] = useState(false)
  
    // Exibir ou esconder os botões
    const toggleVisibility = () => {
    
    if(window.pageYOffset > 300){
    setIsTopVisible(true) // Exibe o botão para ir para o topo
    } else{
        setIsTopVisible(false) // Esconde o botão
    }

    // Verifica se o usuario chegou ao topo ou não
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    if (window.pageYOffset + windowHeight < scrollHeight){
        setIsBottomVisible(true) // Exibe o botão para ir para o final
    } else{
        setIsBottomVisible(false) // Esconde o botão
    }
    }

    // Função para rolar até o topo
    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        })
    }

    // Função para rolar até o fundo
    const scrollToBottom = () => {
        window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"     
        })
    }

    // Adiciona o evento de scroll
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])
  
  return (
    <>
    {isTopVisible && (
        <button
          onClick={scrollToTop}
          title="Ir para o topo"
          className="cursor-pointer
           fixed
           bottom-1
           right-5
            bg-blue-500
            text-white
            rounded-full
            p-3 text-2xl 
            shadow-lg
            hover:bg-blue-600
            transition-all duration-300"
        >
          ↑
        </button>
      )}
        {isBottomVisible && (
        <button
          onClick={scrollToBottom}
          title="Ir para o final"
          className="
          cursor-pointer
          fixed
           bottom-16
            right-5
             bg-green-500
              text-white
               rounded-full
                p-3
                 text-2xl
                  shadow-lg
                   hover:bg-green-600
                    transition-all
                     duration-300"
        >
          ↓
        </button>
      )}

    </>
  )
}

export default ScrollButons