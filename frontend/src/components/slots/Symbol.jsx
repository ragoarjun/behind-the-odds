const Symbol = ({ symbol }) => {

    return (

        <div
            className="
              text-5xl
              h-28
              flex
              items-center
              justify-center
              bg-linear-to-b
              from-[#242424]
              to-[#111]
              border-b
              border-[#333]
              last:border-b-0
              hover:bg-[#2B2B2B]
              transition
              duration-300
              drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]
              "
        >

            {symbol}

        </div>

    );

};

export default Symbol;