
export const content = `
    <li class="hover:text-color-2">
        <RouterLink :to="{ name : 'Home'}" class="py-6 inline-block tracking-widest relative before:content-[''] before:absolute before:top-0 before:left-1/2 
            before:h-2 before:w-[140%] before:transform before:-translate-x-1/2 
            before:-translate-y-1/2 before:transition-all before:duration-200 before:ease-linear"
            :class=" BreakCurmp === 'HOME' ? 'before:bg-color-2 before:w-full' : ''" 
            >HOME </RouterLink>
    </li>
    <li class="ml-10 galleery-header">
        <RouterLink :to="{ name: 'Gallery' }" class="py-6 inline-block tracking-widest relative before:content-[''] before:absolute before:top-0 before:left-1/2 
            before:h-2 before:w-[140%] before:transform before:-translate-x-1/2 
            before:-translate-y-1/2 before:transition-all before:duration-200 before:ease-linear before:hover:bg-color-2 before:hover:w-full"
            :class=" BreakCurmp === 'GALLERY' ? 'before:bg-color-2 before:w-full' : ''"  
            >
        GALLERY </RouterLink>
        <ul class="navbar absolute p-[30px] ml-[-30px] w-[250px] bg-color-white z-[5] text-left block opacity-0 invisible">
            <li class="block py-3" v-for="item in ListCategory">
                <a href="#" class="text-sm text-color-4 leading-[1.2] font-semibold tracking-wider hover:text-color-2">{{ item.title }}</a>
            </li>
        </ul>
    </li>
    <li class="ml-10 ">
        <RouterLink :to="{ name: 'Shop' }" class="py-6 inline-block tracking-widest relative before:content-[''] before:absolute before:top-0 before:left-1/2 
            before:h-2 before:w-[140%] before:transform before:-translate-x-1/2 
            before:-translate-y-1/2 before:transition-all before:duration-200 before:ease-linear before:hover:bg-color-2 before:hover:w-full"
            :class=" BreakCurmp === 'SHOP' ? 'before:bg-color-2 before:w-full' : ''" 
            >
        SHOP </RouterLink>
    </li>
    <li class="ml-10">
        <RouterLink :to="{ name : 'blog'}" class="py-6 inline-block tracking-widest relative before:content-[''] before:absolute before:top-0 before:left-1/2 
            before:h-2 before:w-[140%] before:transform before:-translate-x-1/2 
            before:-translate-y-1/2 before:transition-all before:duration-200 before:ease-linear before:hover:bg-color-2 before:hover:w-full"
            :class=" BreakCurmp === 'BLOG' ? 'before:bg-color-2 before:w-full' : ''" 
            >
        BLOG </RouterLink>
    </li>
    <li class="ml-10">
        <RouterLink to="#" class="py-6 inline-block tracking-widest relative before:content-[''] before:absolute before:top-0 before:left-1/2 
            before:h-2 before:w-[140%] before:transform before:-translate-x-1/2 
            before:-translate-y-1/2 before:transition-all before:duration-200 before:ease-linear before:hover:bg-color-2 before:hover:w-full"
            :class=" BreakCurmp === 'PAGES' ? 'before:bg-color-2 before:w-full' : ''" 
            >PAGES </RouterLink>
    </li>
    <li class="ml-10">
        <RouterLink to="#" class="py-6 inline-block tracking-widest relative before:content-[''] before:absolute before:top-0 before:left-1/2 
            before:h-2 before:w-[140%] before:transform before:-translate-x-1/2 
            before:-translate-y-1/2 before:transition-all before:duration-200 before:ease-linear before:hover:bg-color-2 before:hover:w-full">ELEMENTS </RouterLink>
    </li>
    <li class="ml-10">
        <RouterLink to="#" class="py-6 inline-block tracking-widest">CONTACT US </RouterLink>
    </li>
`;