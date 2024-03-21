
import MaxWidth from "./MaxWidth"


const Header = () => {

    return (
        <div className="w-full bg-brown-500 px-4 py-5">
            <MaxWidth className={`w-full flex justify-between items-center`}>
                <h1 className="text-slate-100 font-serif font-bold md:text-lg text-sm">Stake_My_Dapp</h1>

                <w3m-button />
            </MaxWidth>
        </div>
    )
}

export default Header