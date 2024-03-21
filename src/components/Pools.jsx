import { Dialog, Flex, Text, TextField } from "@radix-ui/themes"
import MaxWidth from "./MaxWidth"
import { useState } from "react"
import PoolTable from "./PoolTable";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import useCreatePool from "../hooks/useCreatePool";
import useHandleApproval from "../hooks/useHandleApproval";



const Pools = () => {
    const [rate, setRate] = useState("")

    const { isConnected } = useWeb3ModalAccount()

    const handleCreatePool = useCreatePool(rate);

    const handleApproval = useHandleApproval();

    return (
        <MaxWidth className={`w-full md:px-6 mt-10`}>
            <section className="w-full flex flex-col md:p-8 p-6 bg-black-900 rounded-md">
                <div className="w-full flex justify-between items-center border-b border-slate-500/50 pb-6">

                    <div >
                        {isConnected && (<button onClick={handleApproval} className="bg-green-500 flex items-center gap-1 text-sm px-6 py-1.5 rounded text-red-100 xyz">Approve

                        </button>)}

                        <Dialog.Root>
                            <Dialog.Trigger>
                                {isConnected && (<button className="bg-green-500 flex items-center gap-1 text-sm px-6 py-1.5 rounded text-red-100">Create A Staking Pool

                                </button>)}

                            </Dialog.Trigger>

                            <Dialog.Content style={{ maxWidth: 450 }}>
                                <Dialog.Title>Staking Pool Creation</Dialog.Title>
                                <Dialog.Description size="2" mb="4">
                                    To create a pool, first approve this contract to spend your reward token
                                </Dialog.Description>

                                <Flex direction="column" gap="3">
                                    <label>
                                        <Text as="div" size="2" mb="1" weight="bold">
                                            Reward Rate
                                        </Text>
                                        <TextField.Input
                                            value={rate}
                                            onChange={e => setRate(e.target.value)}
                                            placeholder="Enter reward rate"
                                        />
                                    </label>
                                </Flex>

                                <Flex gap="3" mt="4" justify="end">
                                    <Dialog.Close>
                                        <button className="bg-slate-200 text-sm px-6 py-1.5 rounded text-slate-800">
                                            Cancel
                                        </button>
                                    </Dialog.Close>
                                    <Dialog.Close>
                                        <button onClick={handleCreatePool} className="bg-blue-500 text-sm px-6 py-1.5 rounded text-slate-100">Create Pool</button>
                                    </Dialog.Close>
                                </Flex>
                            </Dialog.Content>
                        </Dialog.Root>
                    </div>
                </div>

                <PoolTable />
            </section>
        </MaxWidth>
    )
}

export default Pools