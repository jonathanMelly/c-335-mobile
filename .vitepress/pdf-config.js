
module.exports = {
    //Idée future: marked_extensions : mermaid
    //https://github.com/emersonbottero/vitepress-plugin-mermaid/tree/main/src
    //https://marked.js.org/using_pro#renderer
    //https://github.com/mermaid-js/mermaid/issues/2972
    //https://mermaid.js.org/config/usage.html#example-of-a-marked-renderer
    //https://github.com/MichielDeMey/marked-mermaid/blob/main/src/index.js
    //https://github.com/simonhaenisch/md-to-pdf/blob/master/src/lib/config.ts [fORK and update DEPS!!]
    pdf_options: {
        headerTemplate: "<div style='width:297mm;font-size:9px;font-style:italic;display:flex;justify-content: space-between;'>" +
            "<span style='margin-left:1cm'>ETML</span> " +
            "<span><span class='title'></span></span> " +
            "<span style='margin-right:1cm'></span>" +
            "</div>",
        footerTemplate: "<div style='width:297mm;font-size:9px;font-style:italic;display:flex;justify-content: space-between;'>" +
            "<span style='margin-left:1cm'>Auteur: Jonathan Melly</span> " +
            "<span>Page <span class='pageNumber'></span> / <span class='totalPages'></span></span> " +
            "<span style='margin-right:1cm'>Version du <span class='date'></span></span>" +
            "</div>"
    }
};