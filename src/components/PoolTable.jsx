import { ethers } from "ethers";
import useGetPools from "../hooks/useGetPools"
import { Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import useHandleStakeApproval from "../hooks/useHandleStakeApproval";
import useStake from "../hooks/useStake";
import useClaimReward from "../hooks/useClaimReward";


const PoolTable = () => {
    const data = useGetPools();

    const [amount, setAmount] = useState("");

    const formatter = (value) => {
        let num = Number(value);
        let str = String(num);
        let res = ethers.formatUnits(str, 18);
        return res
    }

    const handleApproval = useHandleStakeApproval();

    const handleStake = useStake(amount);

    const handleRewardClaim = useClaimReward();

    return (
        <div className="w-full overflow-x-scroll mt-4">
            <table className="table-auto w-full border-collapse border border-slate-700">
                <thead className="text-slate-100 py-2 bg-blue-800">
                    <tr>
                        <th className="py-3 font-light">S/N</th>
                        <th className="py-3 font-light">Pools</th>
                        <th className="py-3 font-light">Total Stakers</th>
                        <th className="py-3 font-light">Total Staked</th>
                        <th className="py-3 font-light">Reward In Contract</th>
                        <th className="py-3 font-light">Reward Rate</th>
                        <th className="py-3 font-light">Stake</th>
                        <th className="py-3 font-light">Claim Action</th>
                    </tr>
                </thead>
                <tbody className="text-slate-200 bg-white">
                    {
                        data.map((item, index) => (
                            <tr key={index}>
                                <td className="border border-slate-400 p-2 text-center text-sky-950">{index}</td>
                                <td className="border border-slate-400 p-2 text-center text-sky-950">Pool #{index}</td>
                                <td className="border border-slate-400 p-2 text-center text-sky-950">{Number(item.totalStakers.toString())}</td>
                                <td className="border border-slate-400 p-2 text-center text-sky-950">{formatter(item.totalStaked)}</td>
                                <td className="border border-slate-400 p-2 text-center text-sky-950">{formatter(item.rewardReserve)}</td>
                                <td className="border border-slate-400 p-2 text-center text-sky-950">{Number(item.rewardRate)}</td>
                                <td className="flex flex-col gap-2 justify-center items-center border border-slate-700 p-3 text-center">
                                    <button onClick={handleApproval} className="bg-blue-900 flex items-center gap-1 text-sm px-6 py-1.5 rounded text-slate-100">Approve
                                    </button>
                                    <Dialog.Root>
                                        <Dialog.Trigger>
                                            <button className="bg-blue-700 flex items-center gap-1 text-sm px-6 py-1.5 rounded text-slate-100">Stake
                                            </button>

                                        </Dialog.Trigger>

                                        <Dialog.Content style={{ maxWidth: 450 }}>
                                            <Dialog.Title>Staking</Dialog.Title>
                                            <Dialog.Description size="2" mb="4">
                                                Approve this contract before you stake
                                            </Dialog.Description>

                                            <Flex direction="column" gap="3">
                                                <label>
                                                    <Text as="div" size="2" mb="1" weight="bold">
                                                        Stake Amount
                                                    </Text>
                                                    <TextField.Input
                                                        value={amount}
                                                        onChange={e => setAmount(e.target.value)}
                                                        placeholder="Enter stake amount"
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
                                                    <button onClick={() => handleStake(item.index)} className="bg-green-500 text-sm px-6 py-1.5 rounded text-slate-100">Stake</button>
                                                </Dialog.Close>
                                            </Flex>
                                        </Dialog.Content>
                                    </Dialog.Root>
                                </td>
                                <td className="flex flex-col gap-2 justify-center items-center border border-slate-700 p-3 text-center">
                                    <button onClick={() => handleRewardClaim(item.index)} className="bg-blue-500 flex items-center gap-1 text-sm px-6 py-1.5 rounded text-slate-100">Claim Reward
                                    </button>
                                    <button onClick={() => handleUnstake(item.index)} className="bg-blue-500 flex items-center gap-1 text-sm px-6 py-1.5 rounded text-slate-100">Unstake
                                    </button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default PoolTable