'use strict';

angular.module('buddyguardcloudApp').controller('UpdateDMDialogController',
    ['$scope', '$stateParams', '$modalInstance', '$q', 'entity', 'UpdateDM', 'fileMd5Service',
        function ($scope, $stateParams, $modalInstance, $q, entity, UpdateDM, fileMd5Service) {

            $scope.canSave = false;
            $scope.fileSlices = [];
            $scope.storageResourceEntryDMs = [];
            $scope.containerId;
            $scope.partUploadStatusesMap = {};

            $scope.updateDM = entity;
            $scope.load = function (id) {
                UpdateDM.get({id: id}, function (result) {
                    $scope.updateDM = result;
                });
            };

            var onSaveFinished = function (result) {
                $scope.$emit('buddyguardcloudApp:updateDMUpdate', result);
                $modalInstance.close(result);
            };

            $scope.save = function () {
                if ($scope.updateDM.id != null) {
                    UpdateDM.update($scope.updateDM, onSaveFinished);
                } else {
                    $scope.updateDM.storageResourceEntries = $scope.storageResourceEntryDMs;
                    UpdateDM.updateUploadRequest($scope.updateDM, function (uploadInfoResponse) {
                        $scope.uploadFile(uploadInfoResponse).then(function (returnedValues) {
                            console.log(returnedValues);
                            angular.forEach($scope.storageResourceEntryDMs, function (storageResourceEntry) {
                                storageResourceEntry.storageResourceEntryStatus = $scope.partUploadStatusesMap[storageResourceEntry.part];
                            });
                            var uploadFinishedDTO = {
                                id: uploadInfoResponse.id,
                                storageResourceEntriesUploadStatus: "FINISHED",
                                storageResourceEntries: $scope.storageResourceEntryDMs
                            };
                            UpdateDM.updateUploadFinish(uploadFinishedDTO, onSaveFinished);
                        });
                    });
                }
            };

            $scope.clear = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.selectFile = function (file, errFiles) {
                const fileSize = file.size;
                const maxChunkSize = 64 * 1024 * 1024;
                const numberOfFullSizedChunks = Math.floor(fileSize / maxChunkSize);
                const lastChunkSize = fileSize % maxChunkSize;

                for (var i = 0; i < numberOfFullSizedChunks; i++) {
                    const start = i * maxChunkSize;
                    const end = start + maxChunkSize;
                    var fileSlice = {
                        chunkContent: file.slice(start, end),
                        part: i + 1
                    }
                    $scope.fileSlices.push(fileSlice);
                }
                const lastChunkStart = numberOfFullSizedChunks * maxChunkSize;
                $scope.fileSlices.push({
                    chunkContent: file.slice(lastChunkStart, lastChunkStart + lastChunkSize),
                    part: numberOfFullSizedChunks + 1
                });
                $scope.errFile = errFiles && errFiles[0];

                angular.forEach($scope.fileSlices, function (fileSlice) {
                    fileMd5Service.md5(fileSlice.chunkContent).success(function (md5sum) {
                        $scope.storageResourceEntryDMs.push({
                            containerId: $scope.containerId,
                            checksum: md5sum,
                            fileName: file.name,
                            part: fileSlice.part,
                            resourceType: "ZIP",
                            storageResourceEntryStatus: "READY_FOR_UPLOAD"
                        });
                    });
                });

                $scope.computeHashOfFile(file).then(function () {
                    $scope.canSave = true;
                })
            }

            $scope.uploadFile = function uploadFile(uploadInfo) {
                var returnPromises = [];
                angular.forEach(uploadInfo.updateUploadUrls, function (uploadUrlDTO) {
                    var promise = $q(function (resolve, reject) {
                        setTimeout(function () {
                            var fileUploadRequest = new XMLHttpRequest();
                            fileUploadRequest.onreadystatechange = function (answer) {
                                if (fileUploadRequest.readyState === 4) {
                                    if (fileUploadRequest.status === uploadInfo.responseHttpStatusCode) {
                                        $scope.partUploadStatusesMap[uploadUrlDTO.part] = "UPLOAD_COMPLETED";
                                        resolve('part resolved' + answer);
                                    } else {
                                        $scope.partUploadStatusesMap[uploadUrlDTO.part] = "UPLOAD_FAIL";
                                        reject('part rejected' + answer);
                                    }
                                }
                            };
                            fileUploadRequest.open(uploadInfo.httpMethod, uploadUrlDTO.uploadURL);
                            for (var headerProperty in uploadUrlDTO.headers) {
                                fileUploadRequest.setRequestHeader(headerProperty, uploadUrlDTO.headers[headerProperty]);
                            }

                            fileUploadRequest.send($scope.fileSlices[uploadUrlDTO.part - 1].chunkContent);
                        }, 5000);
                    });
                    returnPromises.push(promise);
                });
                return $q.all(returnPromises);
            };

            $scope.computeHashOfFile = function computeHash(file) {
                return fileMd5Service.md5(file)
                    .progress(function (stats) {
                        console.log('Hashed ' + stats.loaded + ' B out of ' + stats.total + ' B');
                    }).error(function (error) {
                        console.log('Error calculating md5: %o', error);
                    }).success(function (md5sum) {
                        console.log('MD5 for ' + file.name + ' is ' + md5sum);
                        $scope.updateDM.checksum = md5sum;
                    });
            }
        }]);


