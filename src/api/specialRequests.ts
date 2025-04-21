import axios from './axios';

/**
 * 文件上传请求
 * @param file 要上传的文件
 * @param folder 上传目标文件夹
 * @returns 上传后的文件信息
 */
export const uploadFile = async (file: File, folder: string = 'general') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const response = await axios.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

/**
 * 导出CSV数据
 * @param endpoint 导出数据的接口
 * @param filters 过滤条件
 * @param fileName 导出文件名
 */
export const exportCSV = async (endpoint: string, filters: Record<string, any>, fileName: string = 'export.csv') => {
  try {
    const response = await axios.get(endpoint, {
      params: filters,
      responseType: 'blob'
    });

    // 创建Blob链接并点击下载
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error('导出失败:', error);
    throw error;
  }
};

/**
 * 批量导入数据
 * @param endpoint 导入接口
 * @param file 导入的文件
 * @returns 导入结果
 */
export const importBulkData = async (endpoint: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
}; 