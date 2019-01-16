package controller

import (
	"html/template"
	"log"
	"net/http"
)

// IndexViewHandler : View Handler of top page
func SampleFileExplorerViewHandler(w http.ResponseWriter, r *http.Request) {
	// template := template.Must(template.ParseFiles("./views/common/templates.html", "./views/index/index.html"))
	t := template.Must(template.ParseFiles("./views/common/templates.html", "./views/samples/file_explorer/index.html"))

	err := t.ExecuteTemplate(w, "index.html", nil)
	if err != nil {
		log.Fatalf("template execution: %s", err)
	}
}
