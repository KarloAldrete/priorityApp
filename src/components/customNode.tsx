'use client'

import React, { memo, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { IconReportAnalytics } from '@tabler/icons-react';

interface CustomNodeProps {
    data: {
        name: string;
        tareasLenght: number;
        isInicio?: boolean;
    };
}

function CustomNode({ data: { name, tareasLenght, isInicio = false } }: CustomNodeProps) {

    return (
        <div className="min-w-64 max-w-80 h-20 flex justify-center items-center rounded-[8px] p-4 border border-[#E2E8F0] bg-white">
            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center text-center">
                    <span className="text-base font-bold leading-6">{name}</span>
                </div>

                {
                    !isInicio && (
                        <div className="flex justify-center items-center gap-2">
                            <div className='w-6 h-6 flex justify-center items-center rounded-full bg-[#F1F5F9]'>
                                <IconReportAnalytics size={16} color='#64748B' />
                            </div>
                            <div className='flex justify-center items-center'>
                                <span className='text-base font-medium text-[#64748B]'>Tareas incluidas: {tareasLenght}</span>
                            </div>
                        </div>
                    )
                }



            </div>

            {
                isInicio ? (

                    <Handle
                        type="source"
                        position={Position.Right}
                        className="w-16 !bg-black"
                    />


                ) : (

                    <Handle
                        type="target"
                        position={Position.Left}
                        className="w-16 !bg-black"
                    />
                )
            }




        </div>
    );
}

export default memo(CustomNode);