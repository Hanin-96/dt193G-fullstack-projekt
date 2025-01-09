<template>
    <div class="flex justify-center max-w-4xl w-full mx-auto items-start gap-4">
        <LogoImg class="max-w-20 mt-20"/>
        <div class="w-full max-w-4xl">
            <HeaderComponent />
            <MainContent>
                <!--Här kan vi lägga in kompontent för hämtning av lager produkter-->
                <div class="bg-white p-4 mx-4 relative top-10 max-w-80">
                    Test
                </div>
                
            </MainContent>
        </div>
    </div>

</template>

<script>
import MainContent from '@/components/MainContent.vue';
import HeaderComponent from '../components/Header.vue'
import LogoImg from '@/components/LogoImg.vue';

export default {
    //hämtar in komponent för login
    components: {
        HeaderComponent,
        MainContent,
        LogoImg
    }
}
</script>
