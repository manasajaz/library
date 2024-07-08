import React from 'react'
import BAbutton from '../component/button';
import BAinput from '../component/input';

function Setting() {
    return (
        <section className='mt-10'>

            <div className='bg-[#ffffff] shadow-md p-4 rounded-[10px]'>
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <h1 className='radikal-medium lg:text-[28px] text-[22px] mb-5'>Edit Paypal Setting</h1>
                    </div>
                    <div className="col-span-12">

                        <label className="text-sm font-medium text-gray-700 tracking-wide">Paypal Sandbox Client ID</label>
                        <BAinput
                            type="text"
                            label="Client ID"

                        />

                    </div>
                    <div className="col-span-12 mt-4">
                        <BAbutton label="Submit" />
                    </div>


                </div>
            </div>

        </section>
    )
}

export default Setting