
<template>
    <div class="container mx-auto py-5">
        <div class="grid grid-cols-3 gap-5">
            <div class="col-span-2">
                <div class="flex justify-between gap-3 ">
                    <input type="text" placeholder="First Name" class="w-full min-h-[60px] bg-transparent py-4 focus:outline-none border-b border-border-color-2 text-font-15">
                    <input type="text" placeholder="Last Name" class="w-full min-h-[60px] py-4 bg-transparent focus:outline-none border-b border-border-color-2 text-font-15">
                </div>
                <div class="flex justify-between gap-3 pt-7">
                    <input type="text" placeholder="Email" class="w-full min-h-[60px] bg-transparent py-4 focus:outline-none border-b border-border-color-2 text-font-15">
                    <input type="text" placeholder="Phone" class="w-full min-h-[60px] bg-transparent py-4 focus:outline-none border-b border-border-color-2 text-font-15">
                </div>
            </div>
            <textarea name="" id="message" cols="30" class="w-full focus:outline-none bg-transparent h-[150px] max-h-[238px] min-h-[60px] py-4 border-b border-border-color-2 text-font-15" placeholder="Message"></textarea>
        </div>
        <div class="pt-8">
            <button 
                class="text-sm font-bold text-color-white py-6 px-14 bg-color-6 rounded-lg hover:bg-color-2 transition-all duration-200 ease-in-out">
                SUBMIT</button>
        </div>
    </div>
</template>