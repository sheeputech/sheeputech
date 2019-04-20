package controller

import (
	"html/template"
	"log"
	"net/http"
	"sheeputech/app/services/common"
)

// SampleFileExplorerViewHandler : View Handler of top page
func SampleFileExplorerViewHandler(w http.ResponseWriter, r *http.Request) {
	logger, _ := common.NewLogger()
	defer logger.Close()
	logger.Output(common.Info, "START", r)

	t := template.Must(template.ParseFiles("./views/common/templates.html", "./views/samples/file_explorer/index.html"))
	err := t.ExecuteTemplate(w, "index.html", nil)
	if err != nil {
		log.Fatalf("template execution: %s", err)
	}

	logger.Output(common.Info, "END", r)
}
