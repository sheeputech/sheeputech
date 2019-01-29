package common

import (
	"log"
	"net/http"

	"cloud.google.com/go/logging"

	"golang.org/x/net/context"
)

type LogClient struct {
	Client *logging.Client
}

// NewLogger create a client of Stackdriver Logging
func NewLogger() (*LogClient, error) {
	cli, err := logging.NewClient(context.Background(), GoogleCloudProjectID)
	if err != nil {
		log.Fatalf("Failed to create Stackdriver Logging cli: %v", err)
	}
	return &LogClient{Client: cli}, err
}

// Close closes loggin.Client
func (cli *LogClient) Close() {
	cli.Client.Close()
}

// Output output logs of INFO and Warning level to GCP Stackdriver Logging
func (cli *LogClient) Output(level logging.Severity, message string, r *http.Request) {
	httpRequest := &logging.HTTPRequest{
		Request: r,
	}
	logger := cli.Client.Logger(GoogleCloudLogName)
	logger.Log(logging.Entry{Severity: level, Payload: message, HTTPRequest: httpRequest})
}

// OutputError output logs of Warning and Critical level to GCP Stackdriver Logging
func (cli *LogClient) OutputError(level logging.Severity, message error, r *http.Request) {
	httpRequest := &logging.HTTPRequest{
		Request: r,
	}
	logger := cli.Client.Logger(GoogleCloudLogName)
	logger.Log(logging.Entry{Severity: level, Payload: message.Error(), HTTPRequest: httpRequest})
}
